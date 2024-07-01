import Handler from "../../application/handler/Handler";
import DomainEvent from "../../domain/event/DomainEvent";

export default class Mediator {
	handlers: Handler[];

	constructor () {
		this.handlers = [];
	}

	register (handler: Handler) {
		this.handlers.push(handler);
	}

	async publish (event: DomainEvent) {
		for (const handler of this.handlers) {
			if (handler.name === event.name) {
				await handler.handle(event);
			}
		}
	}
}