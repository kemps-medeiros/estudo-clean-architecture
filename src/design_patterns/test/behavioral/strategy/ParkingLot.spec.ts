import AirportTicketCalculator from "../../../behavioral/strategy/AirportTicketCalculator";
import BeachTicketCalculator from "../../../behavioral/strategy/BeachTicketCalculator";
import ParkingLot from "../../../behavioral/strategy/ParkingLot";
import ShoppingTicketCalculator from "../../../behavioral/strategy/ShoppingTicketCalculator";

it("Deve criar um estacionamento com 500 vagas", function () {
	const parkingLot = new ParkingLot(500, new BeachTicketCalculator());
	expect(parkingLot.getEmptySpaces()).toBe(500);
});

it("Deve entrar um carro", function () {
	const parkingLot = new ParkingLot(500, new BeachTicketCalculator());
	parkingLot.checkin("AAA-9999", new Date("2021-03-01T10:00:00"));
	expect(parkingLot.getEmptySpaces()).toBe(499);
});

it("Deve sair um carro", function () {
	const parkingLot = new ParkingLot(500, new BeachTicketCalculator());
	parkingLot.checkin("AAA-9999", new Date("2021-03-01T10:00:00"));
	parkingLot.checkout("AAA-9999");
	expect(parkingLot.getEmptySpaces()).toBe(500);
});

it("Deve calcular o ticket do estacionamento na praia, na praia é sempre 20 reais independente do tempo estacionado", function () {
	const parkingLot = new ParkingLot(500, new BeachTicketCalculator());
	parkingLot.checkin("AAA-9999", new Date("2021-03-01T10:00:00"));
	const ticket = parkingLot.calculateTicket("AAA-9999", new Date("2021-03-01T15:00:00"));
	parkingLot.checkout("AAA-9999");
	expect(ticket.price).toBe(20);
});

it("Deve calcular o ticket do estacionamento na shopping, no shopping é 10 reais as primeiras 3 horas e o restante 10 reais por hora", function () {
	const parkingLot = new ParkingLot(500, new ShoppingTicketCalculator());
	parkingLot.checkin("AAA-9999", new Date("2021-03-01T10:00:00"));
	const ticket = parkingLot.calculateTicket("AAA-9999", new Date("2021-03-01T15:00:00"));
	parkingLot.checkout("AAA-9999");
	expect(ticket.price).toBe(30);
});

it("Deve calcular o ticket do estacionamento na aeroporto, no aeroporto é 10 reais por hora", function () {
	const parkingLot = new ParkingLot(500, new AirportTicketCalculator());
	parkingLot.checkin("AAA-9999", new Date("2021-03-01T10:00:00"));
	const ticket = parkingLot.calculateTicket("AAA-9999", new Date("2021-03-01T15:00:00"));
	parkingLot.checkout("AAA-9999");
	expect(ticket.price).toBe(50);
});