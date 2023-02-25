## Mac 终端配置

### 终端(Terminal)主题

> Mac终端一样可以很好看	！

项目地址：[macos-terminal-themes](https://github.com/lysyi3m/macos-terminal-themes)

#### 使用说明

* 下载该项目

* 转到themes/文件夹

* 双击*.terminal文件。它将打开一个带有选定颜色主题的新终端窗口。

* 将主题设置为默认主题Shell -> Use Settings as Default


### 使用oh-my-zsh

> oh-my-zsh 是一个基于 zsh shell 的扩展框架，提供了许多实用的功能和主题，使得使用 zsh shell 更加方便和舒适。它是由社区驱动的开源项目，提供了大量的插件和主题，可以帮助用户定制他们的 shell 界面，并提供更好的命令行体验。


1. 安装 [HomeBrew](https://brew.sh/) 

> 作为 macOS 必备的包管理工具，相信大家肯定已经很熟悉了，没安装的朋友可以执行下面命令装一下，安装过的可以执行下面命令可以进行更新。

打开终端，执行命令：`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

2. 更新zsh、git

macOS 一般会自带 zsh，不过版本会比较早，我们先更新一下，以便使用最新特性。

```shell
brew install zsh

==> Downloading https://homebrew.bintray.com/bottles/zsh-5.7.1.high_sierra.bottle.tar.gz
######################################################################## 100.0%
==> Pouring zsh-5.7.1.high_sierra.bottle.tar.gz
/usr/local/Cellar/zsh/5.7.1: 1,515 files, 13.3MB
```

3. 切换至 zsh

查看当前使用的 shell

```shell
echo $SHELL

/bin/bash
```

查看安装的 shell

```shell
cat /etc/shells

/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

切换为 zsh: `chsh -s /bin/zsh`

重启终端即可使用 zsh。

4. 安装 [oh-my-zsh](https://ohmyz.sh/)

`sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`


安装完成后，终端展示如下内容：

```shell
  ____  / /_     ____ ___  __  __   ____  _____/ /_  
 / __ \/ __ \   / __ `__ \/ / / /  /_  / / ___/ __ \ 
/ /_/ / / / /  / / / / / / /_/ /    / /_(__  ) / / / 
\____/_/ /_/  /_/ /_/ /_/\__, /    /___/____/_/ /_/  
                        /____/                       ....is now installed!


Please look over the ~/.zshrc file to select plugins, themes, and options.

p.s. Follow us at https://twitter.com/ohmyzsh.

p.p.s. Get stickers and t-shirts at http://shop.planetargon.com.
```

#### 配置 oh-my-zsh

看到这里，安装流程已经完毕啦，执行最后的配置，就可以进行体验了。

* 打开 oh-my-zsh 配置文件

打开 zshrc 文件进行编辑，也可以使用 vim 编辑器 `open ~/.zshrc`

* 本人使用的是 vs code

`open ~/.zshrc -a Visual\ Studio\ Code`

也可以使用 Sublime

`open ~/.zshrc -a Sublime\ Text`


##### 主题

配置项 ZSH_THEME 即为 oh-my-zsh 的主题配置，oh-my-zsh 的 GitHub Wiki 页面提供了 主题列表
当设置为 ZSH_THEME=random 时，每次打开终端都会使用一种随机的主题。

##### 插件

plugins=(git osx autojump zsh-autosuggestions zsh-syntax-highlighting)
注意：其中 zsh-autosuggestions 和 zsh-syntax-highlighting 是自定义安装的插件，需要用 git 将插件 clone 到指定插件目录下：

##### 自动提示插件
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions

##### 语法高亮插件
git clone git://github.com/zsh-users/zsh-syntax-highlighting $ZSH_CUSTOM/plugins/zsh-syntax-highlighting
需要其他插件的可以自行安装，如果插件未安装，开启终端的时候会报错，按照错误提示，安装对应的插件即可。

更新配置 `source ~/.zshrc`


更新完配置即可生效，不想更新配置的话，新开一个终端同样可以生效。

正所谓风雨之后见彩虹，经过这一番捣鼓，电脑用起来更加顺手了，可以愉快的开发了。








































