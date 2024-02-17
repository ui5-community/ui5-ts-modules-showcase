import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";

import { reverse } from "lodash";

/**
 * @namespace my.tsapp.showcase.controller
 */
export default class Main extends BaseController {
	public sayHello(): void {
		MessageBox.show(reverse("Hello World!".split("")).join(""));
	}
}
