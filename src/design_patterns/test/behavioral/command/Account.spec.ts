import Account from "../../../behavioral/command/Account";
import CreditCommand from "../../../behavioral/command/CreditCommand";
import DebitCommand from "../../../behavioral/command/DebitCommand";

describe("Account", () => {
  it("Deve criar uma conta bancária", function () {
    const account = new Account("0011239");
    const balance = account.getBalance();
    expect(balance).toBe(0);
  });

  it("Deve creditar uma conta bancária", function () {
    const account = new Account("0011239");
    account.credit(100);
    const balance = account.getBalance();
    expect(balance).toBe(100);
  });

  it("Deve debitar uma conta bancária", function () {
    const account = new Account("0011239");
    account.credit(100);
    account.debit(50);
    const balance = account.getBalance();
    expect(balance).toBe(50);
  });

  it("Deve creditar uma conta bancária usando um comando", function () {
    const account = new Account("0011239");
    const creditCommand = new CreditCommand(account, 100);
    creditCommand.execute();
    const balance = account.getBalance();
    expect(balance).toBe(100);
  });

  it("Deve debitar uma conta bancária usando um comando", function () {
    const account = new Account("0011239");
    const creditCommand = new CreditCommand(account, 100);
    creditCommand.execute();
    const debitCommand = new DebitCommand(account, 50);
    debitCommand.execute();
    const balance = account.getBalance();
    expect(balance).toBe(50);
  });
});
