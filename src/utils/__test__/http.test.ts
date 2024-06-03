import  http  from 'src/utils/http';
import { it, describe, expect } from "vitest";
import HttpStatusCode from "src/constants/httpStatusCode.enum";

describe('http axios', () => {
  it("Goi api", async () => {
    const res = await http.get('products');
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Auth Request', async () => {
    await http.post('login', {
      email: 'linhvhph31139@fpt.edu.vn',
      password: '987654321'
    })
    const res = await http.get('me');
    expect(res.status).toBe(HttpStatusCode.Ok)
  });

  it('Refresh Token', async () => {
    
  })
})