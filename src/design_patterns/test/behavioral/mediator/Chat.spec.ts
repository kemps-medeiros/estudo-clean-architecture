import Channel from "../../../behavioral/mediator/Channel";
import Participant from "../../../behavioral/mediator/Participant";

describe("Chat", () => {
    it("Deve criar um chat entre participantes diretamente", function () {
        const participantA = new Participant("A");
        const participantB = new Participant("B");
        const participantC = new Participant("C");
        participantB.receive(participantA, "hello");
        participantC.receive(participantA, "hello");
        expect(participantB.messages[0]).toBe("A: hello");
        expect(participantC.messages[0]).toBe("A: hello");
    });
    
    it("Deve criar um chat entre participantes indiretamente", function () {
        const participantA = new Participant("A");
        const participantB = new Participant("B");
        const participantC = new Participant("C");
        const channel = new Channel();
        channel.register(participantA);
        channel.register(participantB);
        channel.register(participantC);
        channel.send(participantA, "hello");
        expect(participantB.messages[0]).toBe("A: hello");
        expect(participantC.messages[0]).toBe("A: hello");
    });
})