# Pokemon

![image](./screenshots/login.png?raw=true = 640×1136 ) ![image](./screenshots/home.png?raw=true = 640×1136 )

### Setup Project

Install Expo on your mobile device.

```
npm install
npx expo start
# Scan the QRCode on your mobile device
```

### Setup Pretier & Eslint

```
npm install prettier eslint-plugin-prettier eslint --save-dev
npm init @eslint/config

npm install eslint-config-prettier eslint-plugin-react-hooks --save-dev
```

-   Create prettierrc and ignore file

```
touch .prettierrc.js

module.exports = {
    singleQuote: true,
    trailingComma: 'all',
    tabWidth: 4,
};

```

```
touch .prettierignore

# Ignore artifacts:
build
coverage
```

-   Add this in you package.json scripts.

```
    "lint": "eslint --ext .jsx --ext .jsx ./src",
    "lint:fix": "eslint --fix --ext .jsx --ext .jsx ./src",
    "format": "prettier --check ./src",
    "write": "prettier --write ./src"
```

-   Check eslint fixes

```
npm run lint:fix
npm run write
```

## Run emulator

```
Go to your SDK
cd C:\Users\Acer\AppData\Local\Android\Sdk\emulator
./emulator -list-avds
./emulator -avd name_of_emulator
```
