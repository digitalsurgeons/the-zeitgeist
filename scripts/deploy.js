const hre = require('hardhat')

async function main() {
  const Zeitgeist = await hre.ethers.getContractFactory('Zeitgeist')
  const zeitgeist = await Zeitgeist.deploy()

  await zeitgeist.deployed()

  console.log('Zeitgeist deployed', zeitgeist.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
