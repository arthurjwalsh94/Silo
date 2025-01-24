// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mintToken(address to, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(to, newTokenId);
        // Optional: If you'd like a baseURI-based approach or a separate storage for URIs, you'd set that here
        // For a minimal approach, we won't store it on-chain unless you integrate _setTokenURI if you import ERC721URIStorage.

        tokenCounter += 1;
        return newTokenId;
    }
}