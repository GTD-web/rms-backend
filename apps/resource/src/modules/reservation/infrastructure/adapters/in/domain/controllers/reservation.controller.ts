import { Controller, Get, Param, Post, Body, Patch, Delete } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ReservationService } from "@resource/modules/reservation/application/services/reservation.service";
import { ParticipantService } from "@resource/modules/reservation/application/services/participant.service";
import { CreateReservationDto } from "@resource/modules/reservation/application/dtos/create-reservation.dto";
import { UpdateReservationTimeDto } from "@resource/modules/reservation/application/dtos/update-reservation.dto";

@Controller('reservations')
@ApiBearerAuth()
export class ReservationController {
    constructor(
        private readonly reservationService: ReservationService,
        private readonly participantService: ParticipantService,
    ) {}

    @Get()
    async findAllReservations() {
        return this.reservationService.findAll();
    }

    @Get(':id')
    async findReservationById(@Param('id') id: string) {
        return this.reservationService.findOne({ where: { reservationId: id } });
    }

    @Post()
    async createReservation(@Body() createReservationDto: CreateReservationDto) {
        return this.reservationService.create(createReservationDto);
    }
    
}