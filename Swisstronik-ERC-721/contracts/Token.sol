// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MintERC721 is ERC721 {
    uint256 private _currentTokenId = 0;

    event ERC721Minted(address recipient, uint256 tokenId);

    constructor() ERC721("ggGodvia721", "GG721") {}

    function mintERC721(address recipient) public returns (uint256) {
        _currentTokenId += 1;
        uint256 newItemId = _currentTokenId;
        _mint(recipient, newItemId);
        
        emit ERC721Minted(recipient, newItemId);  

        return newItemId;
    }

    function burnERC721(uint256 tokenId) public {
        _burn(tokenId);
    }
}