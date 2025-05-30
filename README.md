# Launch token on pumpfun(pump.fun), bundle buy, migrate token to pump swap(pumpAmm), buy token on pumpswap, increase volume

## How it works

* Create wallets for bundle buy, make volume.<br>
* Distribute SOL to wallets.<br>
  <b>They shouldn't share the same original fun source since it can be easily detected as insiders.</b>
* Launch token or find an already launched token which has no holders.<br>
  <b>Already launched tokens have different creator and a bit long history.</b>
* Bundle buy the token using Jito.<br>
* Send the migrate transaction with buy on pump swap.<br>
  <b>You can be the last buyer on pumpfun and first buyer on pump swap.</b>
* Distribute tokens to maker wallets.<br>
  <b>Usually they detect token transfer, so remain some holders that can be displayed on the page as top holders.</b>
* Increase volume using maker wallets.<br>
  <b>Send buy and sell instructions in the same transaction, so that, it can not be affected by other users.</b>
* Calculate profit.<br>
  <b>Calculate total fee spent and total profit once you sell all the tokens you hold.</b><br>
* Sell tokens.<br>
  <b>Sell all tokens if you can make enough profit.</b>
* Close wallets and prepare for next token launch.<br>

##  How to install

### Prerequites

#### Install node environment. <br>

Here're some useful links for installing node environment.<br>
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm <br>
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04

### Download the project

#### Setup git bash if you don't have it.<br>
https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

#### Clone this project to local machine.
> git clone https://github.com/m8s-lab/pump-launcher

#### Install node modules.
> cd pump-launcher<br>
yarn

##  Configuration

### Set environment variables in `.env` file

#### Copy .env.template as .env and edit it.

> MONGO_URI: uri to mongo db that stores token data<br>
SOLANA_MAINNET_RPC: solana mainnet rpc url<br>
PRIVATE_KEY_PATH: path to main solana keypair file.<br>

### Config the parameters

> IS_NEW_LAUNCH: launch new token or user provide CA of already launched token.<br>
NUM_BUNDLE_WALLETS: number of wallets to bundle buy on pump.fun(max: 27).<br>
INITIAL_BUY_LAMPORTS: initial buy lamports in the launch transaction.<br>
NUM_MAKERS: number of maker wallets.<br>
MIGRATE_BUY_LAMPORTS: first buy lamports after the migrate instruction.<br>
TP_AMOUNT: sell tokens if profit reaches TP_AMOUNT

## Run bot

Build the project.
> yarn build

Run bot and take profit.
> yarn start

## Example address

Token CA: https://solscan.io/account/jV7diGWdEcveTDPfLjWqEToJz428E195WXyvbPGpump<br>
Bundle buy tx(last buy on pump.fun): https://solscan.io/tx/3CssBSf5CYdvBrBUh5aY6HNYq9nWYxrkfgxx7HBN19Ar8bz53GbHL44Bi4tFNHw1z6q8NnYe6VktSUnCrDFsshYq<br>
Migrate tx(first buy on pumpswap): https://solscan.io/tx/3cfWwqFTbP7bz4BPqky9guJyZSxsB4CZUUko5kE4Si1FTa8KHdcjfSayvTQxcmjgeQNj3Hpeyvh2VrjSaeahDQA9<br>

![Screenshot 2025-05-31 050808](https://github.com/user-attachments/assets/8d25dadf-c88e-4876-9160-9eb79aeb9977)


## Contact

* TG: https://t.me/microgift88
* Discord: https://discord.com/users/1074514238325927956
* Email: microgift28@gmail.com
