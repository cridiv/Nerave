// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {PayLockAgreement} from "../src/PayLockAgreement.sol";

contract PayLockAgreementTest is Test {
    PayLockAgreement public payLock;
    address client = address(1);
    address contractor = address(2);

    event MilestoneApproved(uint256 indexed milestoneId, uint256 amount);

    function setUp() public {
        vm.prank(client);
        payLock = new PayLockAgreement(client, contractor, 1000 ether);
    }

    function test_Deployment() public view {
        (PayLockAgreement.Agreement memory agreement, ) = payLock.getAgreementState();
        assertEq(agreement.client, client);
        assertEq(agreement.contractor, contractor);
        assertEq(agreement.totalAmount, 1000 ether);
    }

    function test_AddMilestones() public {
        string[] memory titles = new string[](2);
        titles[0] = "Milestone 1";
        titles[1] = "Milestone 2";
        
        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 500 ether;
        amounts[1] = 500 ether;

        vm.prank(client);
        payLock.addMilestones(titles, amounts);

        assertEq(payLock.milestoneCount(), 2);
    }

    function test_ConfirmMilestone() public {
        string[] memory titles = new string[](1);
        titles[0] = "Milestone 1";
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = 500 ether;

        vm.prank(client);
        payLock.addMilestones(titles, amounts);

        // Contractor confirms
        vm.prank(contractor);
        payLock.confirmMilestone(0);
        
        (, PayLockAgreement.Milestone[] memory m) = payLock.getAgreementState();
        assertTrue(m[0].contractorConfirmed);
        assertFalse(m[0].clientConfirmed);
        assertFalse(m[0].disbursed);

        // Client confirms -> should trigger payout event
        vm.expectEmit(true, false, false, true);
        emit MilestoneApproved(0, 500 ether);
        
        vm.prank(client);
        payLock.confirmMilestone(0);

        (, PayLockAgreement.Milestone[] memory mAfter) = payLock.getAgreementState();
        assertTrue(mAfter[0].clientConfirmed);
        assertTrue(mAfter[0].disbursed);
    }
}
