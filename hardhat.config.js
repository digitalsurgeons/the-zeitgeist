require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
require('dotenv').config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

task('mintNft', 'Mint NFT')
  .addParam('tokenuri', 'The token URI')
  .setAction(async (taskArgs, hre) => {
    const contract = await hre.ethers.getContractAt(
      'Zeitgeist',
      process.env.NEXT_PUBLIC_ZEITGEIST_CONTRACT_ADDRESS,
    )

    console.log('Minting NFT', taskArgs.tokenuri)

    const txn = await contract.mintNFT(taskArgs.tokenuri)
    console.log(txn)
  })

task('updateNft', 'Update NFT URI')
  .addParam('tokenid', 'The token ID to update')
  .addParam('tokenuri', 'The new token URI')
  .setAction(async (taskArgs, hre) => {
    const contract = await hre.ethers.getContractAt(
      'Zeitgeist',
      process.env.NEXT_PUBLIC_ZEITGEIST_CONTRACT_ADDRESS,
    )

    console.log('Updating NFT', taskArgs.tokenid, taskArgs.tokenuri)

    const txn = await contract.updateNFT(Number(taskArgs.tokenid), taskArgs.tokenuri)
    console.log(txn)
  })

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  networks: {
    mainnet: {
      url: process.env.ALCHEMY_API_URL_MAINNET,
      accounts: [process.env.PRIVATE_KEY],
    },
    rinkeby: {
      url: process.env.ALCHEMY_API_URL_RINKEBY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
}
