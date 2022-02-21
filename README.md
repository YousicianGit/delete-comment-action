# delete-comment-action
GitHub action to delete uninformative SonarCloud comments

```yaml
    - name: Delete step
      uses: YousicianGit/delete-comment-action@main
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        userId: 39514782
        userLogin: sonarcloud[bot]
        userType: Bot
```