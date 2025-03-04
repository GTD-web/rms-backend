export interface FileProps {
    fileId?: string;
    fileName: string;
    filePath: string;
}

export class File {
    private readonly props: FileProps;

    constructor(props: FileProps) {
        this.validateProps(props);
        this.props = {
            ...props,
        };
    }

    private validateProps(props: FileProps) {
        if (!props.fileName) {
            throw new Error('File name is required');
        }
        if (!props.filePath) {
            throw new Error('File path is required');
        }
    }

    get fileId(): string {
        return this.props.fileId;
    }

    get fileName(): string {
        return this.props.fileName;
    }

    get filePath(): string {
        return this.props.filePath;
    }

    toJSON(): FileProps {
        return this.props;
    }
}
