


export class ConstService {
  public static user;
  public static permissions;

  public static resultConfirm: boolean;
  constructor() { }

  public setConfirm(confirm) {
    ConstService.resultConfirm = confirm;
  }

  public getConfirm() {
    return ConstService.resultConfirm;
  }
  public getUser() {
    return ConstService.user;
  }

  public setUser(x) {
    ConstService.user = x;
  }
}
