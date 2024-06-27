import InputText from "../../../behavioral/observer/InputText";
import Label from "../../../behavioral/observer/Label";

describe("Component", () => {
    it("Deve criar componentes normal", function () {
        const inputText = new InputText("country");
        const label = new Label("País: {{ country }}");
        inputText.setValue("Brasil");
        label.setValue("country", "Brasil");
        expect(label.getValue()).toBe("País: Brasil");
    });
    
    it("Deve criar componentes reativo", function () {
        const inputText = new InputText("country");
        const label = new Label("País: {{ country }}");
        inputText.register(label);
        inputText.setValue("Brasil");
        expect(label.getValue()).toBe("País: Brasil");
    });
})