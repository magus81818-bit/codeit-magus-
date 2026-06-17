# Cancel

## reset
- 아직 커밋하지 않은 변경사항을 되돌릴 때 사용합니다.
- git reset HEAD [파일명]
- git checkout -- [파일명]

## revert
- 이미 완료된 커밋의 역변환이 되는 커밋을 생성할 때 사용합니다.
- git revert HEAD
- git revert [커밋아이디]
- 충돌
  - 직접 "수동으로" 충돌을 해결한다.
  - 직접 "수동으로" 스테이징 에어리어에 추가합니다.
  - git revert --continue

## stash
- git stash
- git stash drop
- git stash pop
