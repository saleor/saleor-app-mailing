import {APL, FileAPL, RestAPL, UpstashAPL, VercelAPL} from "@saleor/app-sdk/APL";
import { SaleorApp } from "@saleor/app-sdk/saleor-app";

const aplType = process.env.APL ?? "file";
let apl: APL;

switch (aplType) {
  case "vercel":
    apl = new VercelAPL();

    break;
  case "upstash":
    apl = new UpstashAPL();

    break;
  case "file":
    apl = new FileAPL();

    break;
  case "rest": {
    if (!process.env.REST_APL_ENDPOINT || !process.env.REST_APL_TOKEN) {
      throw new Error("Rest APL is not configured - missing env variables. Check saleor-app.ts");
    }

    apl = new RestAPL({
      resourceUrl: process.env.REST_APL_ENDPOINT as string,
      headers: {
        Authorization: `Bearer ${process.env.REST_APL_TOKEN as string}`,
      },
    });

    break;
  }
  default: {
    throw new Error("Invalid APL config, ");
  }
}
export const saleorApp = new SaleorApp({
  apl,
});