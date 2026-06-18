export class MemoScreen {
  showGrettingMessage(username: string): void {
    const element = document.getElementById("greeting-message");
    if (element !== null) {
      element.innerText = `${username}님의 메모장`;
    }
  }
}
