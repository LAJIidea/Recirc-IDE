import { injectable } from "inversify";
import { ModifyInfo, ModifyService } from "../../common/modify-service";
import * as fs from "fs";


@injectable()
export class BackendModifyService implements ModifyService {

  modifyContent(info: ModifyInfo): Promise<void> {
    let content = fs.readFileSync(info.path, 'utf-8');
    let modifyContent = content + info.content;
    fs.writeFileSync(info.path, modifyContent);
    return Promise.resolve()
  }
}