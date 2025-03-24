import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import axios from 'axios';
import { join } from 'path';
import { OpenApiPath } from './openapi-types';

@Injectable()
export class ApiDocService {
    private readonly logger = new Logger(ApiDocService.name);

    constructor() {
        if (process.env.NODE_ENV === 'local') {
            // this.generateApiDocs();
        }
    }

    private MAX_RETRIES = 3;
    private RETRY_DELAY = 2000; // 2초
    private data: any;

    async getApiJson(retries = this.MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, this.RETRY_DELAY));
        try {
            const response = await axios.get('http://localhost:3000/api-docs-json');
            this.data = response.data;
        } catch (error) {
            if (retries > 0) {
                this.getApiJson(retries - 1);
            }
        }
    }

    private getControllers() {
        return Object.entries(this.data.paths)
            .map(([path, routes]) => {
                const controller = path.split('/')[2];
                const apis = Object.entries(routes).map(([method, metadata]) => {
                    return {
                        method,
                        path,
                        metadata,
                    };
                });
                return {
                    controller,
                    apis,
                };
            })
            .reduce((acc, curr) => {
                if (acc[curr.controller]) {
                    acc[curr.controller].push(...curr.apis);
                } else {
                    acc[curr.controller] = [...curr.apis];
                }
                return acc;
            }, {});
    }

    // 스키마의 타입을 문자열로 변환하는 함수
    private getSchemaType(schema: any): string {
        if (schema.type === 'array') {
            const itemType = schema.items ? this.getSchemaType(schema.items) : 'any';
            return `${itemType}[]`;
        }
        return schema.type || 'object';
    }

    // JSON 형식으로 스키마를 변환하는 함수
    private renderSchemaJson(schema: any, indentLevel: number = 1): string {
        const indent = '  '.repeat(indentLevel);
        const commentIndent = '  '.repeat(Math.max(0, indentLevel - 1));
        let content = '';

        if (schema.type === 'object' && schema.properties) {
            content += '{\n';
            const properties = Object.entries(schema.properties);
            properties.forEach(([key, prop]: [string, any], index) => {
                const isLast = index === properties.length - 1;
                const required = (schema.required || []).includes(key);
                const comment = [];

                // 주석에 포함될 정보 수집
                if (prop.description) comment.push(prop.description);
                if (required && prop.type !== 'except') comment.push('✅ Required');
                if (!required && prop.type !== 'except') comment.push('❌ Optional');

                if (prop.type === 'object' && prop.properties) {
                    content += `${indent}"${key}": ${this.renderSchemaJson(prop, indentLevel + 1)}${isLast ? '' : ','}`;
                } else if (prop.type === 'array' && prop.items) {
                    content += `${indent}"${key}": [`;
                    if (prop.items.type === 'object' && prop.items.properties) {
                        content += '\n';
                        content += `${indent}  ${this.renderSchemaJson(prop.items, indentLevel + 2).trim()}`;
                        content += `\n${indent}]${isLast ? '' : ','}`;
                    } else {
                        // 기본 타입 배열의 경우
                        const example = this.getExampleValue(prop.items);
                        content += `${example}]${isLast ? '' : ','}`;
                    }
                } else {
                    const example = this.getExampleValue(prop);
                    content += `${indent}"${key}": ${example}${isLast ? '' : ','}`;
                }

                // 주석 추가
                if (comment.length > 0) {
                    content += ` // ${comment.join(', ')}`;
                }
                content += '\n';
            });
            content += `${commentIndent}}`;
        }

        return content;
    }

    // 예제 값을 생성하는 헬퍼 함수
    private getExampleValue(prop: any): string {
        if (prop.example !== undefined) {
            return typeof prop.example === 'string' ? `"${prop.example}"` : prop.example;
        }

        switch (prop.type) {
            case 'string':
                return prop.enum ? `"${prop.enum[0]}"` : '""';
            case 'number':
                return '0';
            case 'integer':
                return '0';
            case 'boolean':
                return 'false';
            case 'array':
                return '[]';
            default:
                return 'null';
        }
    }

    // resolveSchema 함수 개선
    private resolveSchema(schema: any, schemas: any, visited: Set<string> = new Set()): any {
        if (!schema) return schema;

        if (schema.$ref) {
            const refPath = schema.$ref.split('/');
            const schemaName = refPath[refPath.length - 1];

            // 순환 참조 방지
            if (visited.has(schemaName)) {
                return { type: 'object', description: `Reference to ${schemaName}` };
            }

            visited.add(schemaName);
            return this.resolveSchema(schemas[schemaName], schemas, visited);
        }

        if (schema.allOf) {
            const resolvedSchemas = schema.allOf.map((s) => this.resolveSchema(s, schemas, visited));
            return resolvedSchemas.reduce((acc, curr) => {
                return {
                    ...acc,
                    ...curr,
                    properties: {
                        ...(acc.properties || {}),
                        ...(curr.properties || {}),
                    },
                    required: [...(acc.required || []), ...(curr.required || [])],
                };
            }, {});
        }

        if (schema.properties) {
            const resolvedProperties = {};
            Object.entries(schema.properties).forEach(([key, value]) => {
                resolvedProperties[key] = this.resolveSchema(value, schemas, new Set(visited));
            });
            return { ...schema, properties: resolvedProperties };
        }

        if (schema.items) {
            return {
                ...schema,
                items: this.resolveSchema(schema.items, schemas, visited),
            };
        }

        return schema;
    }

    async generateApiDocs() {
        await this.getApiJson();
        const controllers = this.getControllers();
        const schemas = this.data.components.schemas;

        Object.keys(controllers).forEach((controller, index) => {
            let markdownContent = `# ${controller[0].toUpperCase() + controller.slice(1)}\n\n`;
            // markdownContent += `## ${controller} \n\n`;
            const domain = controllers[controller];

            for (const api of domain) {
                const method = api.method.toUpperCase();
                const path = api.path;
                const metadata: OpenApiPath = api.metadata;

                markdownContent += `### ${metadata.summary || path}\n\n`;
                if (metadata.description) {
                    markdownContent += `${metadata.description}\n\n`;
                }

                markdownContent += `- **Method:** \`${method}\`\n`;
                markdownContent += `- **Endpoint:** \`${path}\`\n\n`;

                // Parameters 추가
                if (metadata.parameters && metadata.parameters.length > 0) {
                    const pathParams = metadata.parameters.filter((p) => p.in === 'path');
                    const queryParams = metadata.parameters.filter((p) => p.in === 'query');

                    if (pathParams.length > 0) {
                        markdownContent += `#### 🔵 Path Parameters\n\n`;
                        markdownContent += '```json\n';
                        markdownContent += '{\n';
                        pathParams.forEach((param, index) => {
                            const resolvedSchema = this.resolveSchema(param.schema, schemas);
                            const isLast = index === pathParams.length - 1;
                            const example = this.getExampleValue(resolvedSchema);
                            const required = param.required ? '✅ Required' : '❌ Optional';

                            markdownContent += `  "${param.name}": ${example} // ${required} ${param.description || ''}\n`;
                            markdownContent += `${isLast ? '' : ','}\n`;
                        });
                        markdownContent += '}\n';
                        markdownContent += '```\n\n';
                    }

                    if (queryParams.length > 0) {
                        markdownContent += `#### 🟣 Query Parameters\n\n`;
                        markdownContent += '```json\n';
                        markdownContent += '{\n';
                        queryParams.forEach((param, index) => {
                            const resolvedSchema = this.resolveSchema(param.schema, schemas);
                            const isLast = index === queryParams.length - 1;
                            const example = this.getExampleValue(resolvedSchema);
                            const required = param.required ? '✅ Required' : '❌ Optional';

                            markdownContent += `  "${param.name}": ${example} // ${required} ${param.description || ''}\n`;
                            markdownContent += `${isLast ? '' : ','}\n`;
                        });
                        markdownContent += '}\n';
                        markdownContent += '```\n\n';
                    }
                }

                // Request Body 추가
                if (metadata.requestBody) {
                    markdownContent += `#### 🟠 Request Body\n\n`;
                    const content = metadata.requestBody.content;

                    Object.keys(content).forEach((contentType) => {
                        markdownContent += `**Content Type:** \`${contentType}\`\n\n`;
                        const resolvedSchema = this.resolveSchema(content[contentType].schema, schemas);
                        markdownContent += '```json\n';
                        markdownContent += this.renderSchemaJson(resolvedSchema);
                        markdownContent += '\n```\n\n';
                    });
                }

                // Response 추가
                markdownContent += `#### Responses\n\n`;
                Object.entries(metadata.responses).forEach(([code, response]) => {
                    const titleEmoji = code.startsWith('2') ? '🟢' : '🔴';
                    markdownContent += `##### ${titleEmoji} ${code} - ${response.description}\n\n`;
                    if (response.content) {
                        Object.keys(response.content).forEach((contentType) => {
                            markdownContent += `**Content Type:** \`${contentType}\`\n\n`;
                            const resolvedSchema = this.resolveSchema(response.content[contentType].schema, schemas);
                            markdownContent += '```json\n';
                            markdownContent += this.renderSchemaJson(resolvedSchema);
                            markdownContent += '\n```\n\n';
                        });
                    }
                });

                markdownContent += `---\n\n`;
            }

            const docsPath = join(
                'C:/Users/USER/Desktop/projects/RMS-documents/docs/개발/03_api',
                `${index + 1 < 10 ? '0' : ''}${index + 1}_${controller}.md`,
            );
            this.saveMarkdown(docsPath, markdownContent);
        });
    }

    private saveMarkdown(filePath: string, content: string) {
        fs.writeFileSync(filePath, content);
        this.logger.log(`API 문서가 생성되었습니다: ${filePath}`);
    }
}
