const API_BASE_URL = "https://localhost:7263";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/GoogelSheet/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log(response, "test res");
    if (response.status !== 200) {
      const err = await response.json();
      throw new Error(err.message || "Login failed");
    }

    
    const data = await response.json();
    return data; // expected: { success: boolean, user: {...} }
  } catch (error) {
    throw error;
  }
};
