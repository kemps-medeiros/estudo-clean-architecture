import DarkWidgetFactory from "../../../creational/abstract_factory/DarkWidgetFactory";
import LightWidgetFactory from "../../../creational/abstract_factory/LightWidgetFactory";
import View from "../../../creational/abstract_factory/View";

describe("Widget", () => {
    it("should create an interface with light tema", function () {
        const view = new View(new LightWidgetFactory());
        expect(view.label.color).toBe("black");
        expect(view.button.color).toBe("white");
        expect(view.button.backgroundColor).toBe("blue");
    })

    it("should create an interface with dark tema", function () {
        const view = new View(new DarkWidgetFactory());
        expect(view.label.color).toBe("white");
        expect(view.button.color).toBe("white");
        expect(view.button.backgroundColor).toBe("black");
    })
})

