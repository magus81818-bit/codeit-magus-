export class Memo {
  private _email: string;
  private _title: string;
  private _content: string;

  constructor(email: string, title: string, content: string) {
    this._email = email;
    this._title = title;
    this._content = content;
  }

  get email(): string {
    return this._email;
  }

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  isContentValidate(): boolean {
    return this._content.includes("바보");
  }
}
