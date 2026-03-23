// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PayLockAgreement {
    struct Agreement {
        address client;
        address contractor;
        uint256 totalAmount;
    }

    struct Milestone {
        string title;
        uint256 amount;
        bool clientConfirmed;
        bool contractorConfirmed;
        bool disbursed;
    }

    Agreement public agreement;
    mapping(uint256 => Milestone) public milestones;
    uint256 public milestoneCount;

    event MilestoneApproved(uint256 indexed milestoneId, uint256 amount);

    modifier onlyParties() {
        require(msg.sender == agreement.client || msg.sender == agreement.contractor, "Not client or contractor");
        _;
    }

    constructor(address _client, address _contractor, uint256 _totalAmount) {
        require(_client != address(0) && _contractor != address(0), "Invalid addresses");
        agreement = Agreement({
            client: _client,
            contractor: _contractor,
            totalAmount: _totalAmount
        });
    }

    function addMilestones(string[] memory titles, uint256[] memory amounts) external {
        require(msg.sender == agreement.client, "Only client can add milestones");
        require(titles.length == amounts.length, "Mismatched arrays");
        
        uint256 totalInput = 0;
        for (uint256 i = 0; i < titles.length; i++) {
            milestones[milestoneCount] = Milestone({
                title: titles[i],
                amount: amounts[i],
                clientConfirmed: false,
                contractorConfirmed: false,
                disbursed: false
            });
            milestoneCount++;
            totalInput += amounts[i];
        }
        
        require(totalInput <= agreement.totalAmount, "Milestone total exceeds agreement amount");
    }

    function getAgreementState() external view returns (Agreement memory, Milestone[] memory) {
        Milestone[] memory allMilestones = new Milestone[](milestoneCount);
        for(uint256 i = 0; i < milestoneCount; i++) {
            allMilestones[i] = milestones[i];
        }
        return (agreement, allMilestones);
    }

    function confirmMilestone(uint256 milestoneId) external onlyParties {
        require(milestoneId < milestoneCount, "Invalid milestone ID");
        Milestone storage m = milestones[milestoneId];
        require(!m.disbursed, "Milestone already disbursed");

        if (msg.sender == agreement.client) {
            m.clientConfirmed = true;
        } else if (msg.sender == agreement.contractor) {
            m.contractorConfirmed = true;
        }

        if (m.clientConfirmed && m.contractorConfirmed && !m.disbursed) {
            m.disbursed = true;
            emit MilestoneApproved(milestoneId, m.amount);
        }
    }
}
