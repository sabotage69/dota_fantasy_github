export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
export const abiBetting = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "userBetAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "userTeamChosen",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "userPotentialWinnings",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "userBetId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "userMatchId",
                "type": "uint256"
            }
        ],
        "name": "LogUserBet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            }
        ],
        "name": "balanceLookUp",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "homePoolShare",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "awayPoolShare",
                "type": "uint256"
            }
        ],
        "name": "poolChecker",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "userTeamChosen",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "eventNumber",
                "type": "uint256"
            }
        ],
        "name": "appendUserBet",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "assistantStructs",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "eventNumber",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "homePool",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "awayPool",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "drawPool",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalPool",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "homeTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "awayTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "drawTeam",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "checkBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "eventNumber",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "homePool",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "awayPool",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "drawPool",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalPool",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "homeTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "awayTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "drawTeam",
                "type": "string"
            }
        ],
        "name": "createAssistant",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "homeTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "awayTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "drawTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "matchDate",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "place",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "finished",
                "type": "bool"
            },
            {
                "internalType": "address[]",
                "name": "userList",
                "type": "address[]"
            }
        ],
        "name": "createMatch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "numerator",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "denominator",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "precision",
                "type": "uint256"
            }
        ],
        "name": "divider",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "fee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "eventNumber",
                "type": "uint256"
            }
        ],
        "name": "getUserCount",
        "outputs": [
            {
                "internalType": "string",
                "name": "userQtty",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "matchCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "selectedMatch",
                "type": "uint256"
            }
        ],
        "name": "matchLookUp",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "matchId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "homeTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "awayTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "drawTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "matchDate",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "place",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "finished",
                "type": "bool"
            },
            {
                "internalType": "address[]",
                "name": "userList",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "matches",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "matchId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "homeTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "awayTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "drawTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "matchDate",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "place",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "finished",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "winnerTeam",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "eventNumber",
                "type": "uint256"
            }
        ],
        "name": "sendWinnings",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "transferAmount",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "eventNumber",
                "type": "uint256"
            }
        ],
        "name": "userLoop1",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "eventNumber",
                "type": "uint256"
            }
        ],
        "name": "userLoop2",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "userStructs",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "betAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "potentialWinnings",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "teamChosen",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "betId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "matchId",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
export const abiEvent = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "homeTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "awayTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "drawTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "matchDate",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "place",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "finished",
                "type": "bool"
            },
            {
                "internalType": "address[]",
                "name": "userList",
                "type": "address[]"
            }
        ],
        "name": "createMatch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "matchCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "selectedMatch",
                "type": "uint256"
            }
        ],
        "name": "matchLookUp",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "matchId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "homeTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "awayTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "drawTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "matchDate",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "place",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "finished",
                "type": "bool"
            },
            {
                "internalType": "address[]",
                "name": "userList",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "matches",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "matchId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "homeTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "awayTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "drawTeam",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "matchDate",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "place",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "finished",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]