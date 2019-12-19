// #region Global Imports
import * as React from "react";
import { mount } from "enzyme";
// #endregion Global Imports

// #region Local Imports
import { PaymentForm } from "@Components";
// #endregion Local Imports

describe("PaymentForm", () => {
    it("should match snapshot", () => {
        const wrapper = mount(<PaymentForm />);
        expect(wrapper).toMatchSnapshot();
    });
});
