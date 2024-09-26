export interface ModifyInfo {
  lines: number;
  col: number;
  path: string;
  content: string
}

export interface ModifyService {
  modifyContent(info: ModifyInfo): Promise<void>
}

export const modifyServicePath = '/services/modify'

export const modifyServiceSymbol = Symbol(modifyServicePath)