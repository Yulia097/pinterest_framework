import { test, expect, APIResponse } from '@playwright/test';


test("get all users", async ({ request }) => {
  const response = await request.get(
    `https://reqres.in/api/users?page=2`
  );
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody["page"]).toBe(2);
  expect(responseBody["per_page"]).toBe(6);
  expect(responseBody["total"]).toBe(12);
  expect(responseBody["total_pages"]).toBe(2);
  expect(responseBody["data"].length).toBe(6);

  expect(responseBody["data"]).toContainEqual(
    expect.objectContaining({
      id: 7,
      email: "michael.lawson@reqres.in",
      first_name: "Michael",
      last_name: "Lawson",
      avatar: "https://reqres.in/img/faces/7-image.jpg",
    })
  );
});

test("create new user", async ({ request }) => {
    let uniqueEmail = `test.automation.scenario.${Date.now()}@gmail.com`
    const response = await request.post(`https://reqres.in/api/users`, {
        data: {
            "name": "morpheus",
            "job": "leader",
            "email": `${uniqueEmail}`
        }
      });
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody["id"]).toBeDefined();
    expect(responseBody["createdAt"]).toBeDefined();
    expect(responseBody["name"]).toBe("morpheus");
    expect(responseBody["email"]).toBeDefined();
    expect(responseBody["email"].includes("@gmail.com")).toBeTruthy();
});

  test("update user", async ({ request }) => {
  
    let userId = "123"; 
  
    const updateResponse = await request.put(`https://reqres.in/api/users/${userId}`, {
      data: {
          "name": "morpheus",
          "job": "zion resident"
      }
    });
  
    expect(updateResponse.status()).toBe(200);
  
    const updatedUser = await updateResponse.json();
    expect(updatedUser["name"]).toBe("morpheus");
    expect(updatedUser["job"]).toBe("zion resident");
  });

test("delete user", async ({ request }) => {

  let userId = "12"; 
  
  const deleteResponse = await request.delete(`https://reqres.in/api/users/${userId}`, {
    data: {
        "name": "morpheus",
        "job": "zion resident"
    }
  });

  expect(deleteResponse.status()).toBe(204);

});

test("patch user", async ({ request }) => {
  let userId = "17"; 
  
  const patchResponse = await request.patch(`https://reqres.in/api/users/${userId}`, {
    data: {
      "name": "morpheus",
      "job": "zion resident",
      "updatedAt": "2024-01-18T10:21:50.201Z"
    }
  });

  expect(patchResponse.status()).toBe(200);
  expect(patchResponse["name"]).toBe("morpheus");
  expect(patchResponse["job"]).toBe("zion resident");
  expect(patchResponse["updatedAt"]).toBe("2024-01-18T10:21:50.201Z");
});

