Lego， 一个基于 [Next.js](https://nextjs.org/) 的低代码平台。

## 系统设计

### 组件(Bricks)

#### 注册组件
  - 在平台里注册一个组件后，才可以在“应用”里使用该组件；
  - 注册时候提供组件的名称、Git 仓库地址、描述（可选）、预览图（可选）；
  - 注册后可以修改组件的 Git 仓库地址、描述、预览图；

#### 组件开发
  一个组件应至少包含以下文件：
  - `index` ：组件的入口文件，export 一个 React 组件，应以 `.jsx` 或 `.tsx` 作为后缀。
  - `config` ：组件的配置选项
    - 如果 export 的是一个 React 组件，则会接收两个 props：value 和 onChange。value 是配置选项的值；onChange 是一个函数，调用后会把参数传递给 “应用” 中对应的组件，从而更新组件状态。
    - 如果是一个 json 文件，平台会根据文件内容生成一个上述的 React 组件，作为组件的配置选项。json 文件格式待补充。

#### 组件版本管理
  - 每个组件都是一个独立的目录，利用 Git 进行版本管理；
  - 在使用组件的时候，可以选择不同版本；

### 应用(Sets)

一个 “应用(set)” 就是由多个 “组件” 组成的页面。

#### 应用的版本管理
  - 与组件类似，每个应用都使用了 Git 进行版本管理。
  - 基于版本管理，可以在平台里对应用进行回滚处理。

#### 应用生命周期
  1. 新建（创建应用）或获取（修改应用）一个初始的 manifest 文件；
  2. 根据 manifest 初始化编辑环境，包括依赖的组件、初始数据；
  3. 保存应用的时候把最新的依赖、应用数据写入 manifest 文件，并在 git 中 commit 到当前的开发分支；
  4. 构建应用的时候先根据 manifest 文件生成以下文件。然后就是一般的前端项目发布流程
    - `data.json` ：应用的配置数据
    - `App.jsx` ：应用的具体逻辑代码
    - `index.jsx` ：应用入口
    - `package.json` ：就是普通 nodejs 项目中的 package.json
  5. 预览的时候就是切到最新的开发分支，然后走 4 中的构建；
  6. 上线的时候出了走 4 中的构建流程，还要把需要发布的分支 merge 到主分支，并自动更新版本，同时用一个表示线上版本的 tag 指向最新的版本号；
  7. 回滚的时候先切换到指定版本，然后走 4 的构建流程，然后把线上版本的 tag 指向刚刚发布的版本
