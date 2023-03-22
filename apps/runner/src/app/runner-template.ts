export const runnerTemplate = (name: string) => `
(test, expect, runnerCase) => {
  console.log(runnerCase);
  test('Case ' + runnerCase.id, async ({ page }) => {
    await page.goto('https://baidu.com')

    await expect(page).toHaveTitle(/百度/)
  })
}
`;
