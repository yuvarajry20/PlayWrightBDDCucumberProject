import { Page } from "playwright/test";
import {Logger} from "winston";
export const pageFixture = {
    page: undefined as Page | undefined,
    logger: undefined as Logger | undefined,
};
