const main = async () => {
	const [deployer] = await hre.ethers.getSigners();
	const accountBalance = await deployer.getBalance();

	console.log("Deploying contracts with account: ", deployer.address);
	console.log("Account balance: ", accountBalance.toString());

	const pingContractFactory = await hre.ethers.getContractFactory("Portal");
	const pingContract = await pingContractFactory.deploy();
	await pingContract.deployed();

	console.log("Portal address: ", pingContract.address);
  };

  const runMain = async () => {
	try {
	  await main();
	  process.exit(0);
	} catch (error) {
	  console.log(error);
	  process.exit(1);
	}
  };

  runMain();
