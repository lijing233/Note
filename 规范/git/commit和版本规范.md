# Git commit message 规范

为了保证项目在多人合作下git commit message的统一和后续代码审查、信息查找、版本回退的高效性，使用以下格式进行规范：

```
git commit -m <type>[optional scope]: <description>
```

type ：用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？

- feat： 创建新特性
- fix： 修复bug
- docs： 更新文档
- style： 不影响代码含义的更改(空白、格式、缺少分号等)
- refactor： 代码重构不影响功能(既不修复bug也不添加特性)
- perf： 改进性能的代码更改
- test： 添加缺失的测试或纠正现有的测试
- build： 影响构建系统或外部依赖项的更改(示例范围:gulp、broccoli、npm)
- ci： 对CI配置文件和脚本的更改(示例范围:Travis, Circle, BrowserStack, SauceLabs)
- chore： 其他不修改src或测试文件的更改
- revert： 回滚上一次提交

optional scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。

description：一句话描述此次提交的主要内容，做到言简意赅。



提交示例：

```
git commit -m "fix(scope): some message"
```





## 使用commitlint + husky对commit msg进行格式校验

### 1.安装@commitlint

**安装依赖**

```shell
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

**添加@commitlint/config-conventional配置文件commitlint.config.js**

```javascript
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {} // 添加自定义规则
};
```

**自定义规则文档：**

@commitlint/cli：  https://github.com/conventional-changelog/commitlint#getting-started

@commitlint/config-conventional： https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional



### 2.安装husky

**安装依赖**

```shell
npm install --save-dev husky
```

**生成husky配置**

package.json

```
"scripts": {
	"prepare": "husky install"
}
```

```shell
npm run prepare
```

```
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

husky主页：

https://github.com/typicode/husky

https://typicode.github.io/husky/#/



### 3.使用commitizen自动化提交规范msg

使用格式化git commit 工具提交

全局安装Commitizen

```
npm install commitizen -g
```

项目根目录运行 添加cz-conventional-changelog和配置

```
commitizen init cz-conventional-changelog --save-dev --save-exact
```

使用git cz提交代码

```
git cz
```



# 使用Standard Version进行版本管理

使用Standard Version来发布新版本，他将自动为你：

1. 更新package.json版本号
2. 添加版本更新的git commit 
3. 添加新版本发布tag
4. 添加新版本发布日志，自动筛选规范提交的commit，生成bug/featrue等日志记录

**安装**

```shell
npm i --save-dev standard-version
```

**添加发布命令**

```json
{
  "scripts": {
    "release": "standard-version"
  }
}
```

**发布新版本**

```shell
npm run release
```

**预发布**

```shell
npm run release -- --prerelease alpha
```

**发布 `major`, `minor` or `patch` 版本**

```shell
npm run release -- --release-as major // 主要版本
npm run release -- --release-as minor // 次要版本
npm run release -- --release-as patch // 修订版本
npm run release -- --release-as 1.1.0 // 自定义版本
```

**自定义规则**

项目根目录创建 `.versionrc` 

https://github.com/conventional-changelog/standard-version

配置文档： https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.1.0/README.md

添加个性化Change Log

```json
{
  "types": [
    {"type":"feat","section":"Features 🎉🎉🎉"},
    {"type":"fix","section":"Bug Fixes 🐛🐛🐛"},
    {"type":"refactor", "section": "Refactor 🔧🔧🔧"},
    {"type":"docs", "section": "Docs 📚📚📚"},
    {"type":"style", "section": "Style 🎨🎨🎨"},
    {"type":"perf", "section": "Style 🚀🚀🚀"},
    {"type":"test","section":"Tests", "hidden": true},
    {"type":"build","section":"Build System", "hidden": true},
    {"type":"ci","hidden":true}
  ]
}
```

跳过tag生成

```json
{
	"skip": {
        "tag": true
    }
}
```

