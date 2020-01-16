# 使用husky和lint-staged构建代码检查规范

```
npm install -D husky
npm install -D lint-staged
```

package.json

```
{
  "scripts": {
    "precommit": "lint-staged"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
  },
  "lint-staged": {
    "src/**/*.{js, vue}": [
      "eslint",
      "git add"
    ]
  },
}
```

