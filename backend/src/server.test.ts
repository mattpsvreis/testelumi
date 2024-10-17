import { server, start } from "./server";

jest.mock("./routes/faturasRoutes");

describe("Server", () => {
  afterAll(async () => {
    await server.close();
  });

  it("should start the server successfully and listen to the 3000 port, replying with pong", async () => {
    await start();

    expect(server.server.listening).toBeTruthy();
    expect(server.server.address()).toEqual(
      expect.objectContaining({
        address: expect.any(String),
        family: "IPv4",
        port: 3000,
      })
    );
    await expect(
      server.inject({ method: "GET", url: "/ping" })
    ).resolves.toEqual(
      expect.objectContaining({
        body: "pong",
      })
    );
  });

  it("should handle startup errors and exit gracefully", async () => {
    const logErrorSpy = jest.spyOn(server.log, "error");
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await start();

    expect(logErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
