import { SupabaseEdgeFetchPost } from "./supabase";

export const ZSignup = async (email: string, password: string) => {

  try {

    const result = await SupabaseEdgeFetchPost(
      '/bokun/signup',
      {
        email: email,
        password: password
      }
    );
    // const resultJson = await result.json();
    console.log("resultJson:", result);

    return {
      ok: true,
      message: "Signup completed",
      data: result
    };
  }
  catch (error) {
    console.log("Error while signup:", error);
    return {
      ok: false,
      error: error,
      message: "Error while signup"
    };
  }

}

export const ZSignin = async (email: string, password: string) => {

  try {

    const result = await SupabaseEdgeFetchPost(
      '/bokun/signin',
      {
        email: email,
        password: password
      }
    );
    // const resultJson = await result.json();
    console.log("resultJson:", result);

    return {
      ok: true,
      message: "Signin completed",
      data: result
    };
  }
  catch (error) {
    console.log("Error while signin:", error);
    return {
      ok: false,
      error: error,
      message: "Error while signin"
    };
  }

}


export const signupUserIfNotExist = async (email: string, name: string) => {
  try {
    const result = await SupabaseEdgeFetchPost(
      '/bokun/signupUserIfNotExist',
      {
        email: email,
        name: name
      }
    );
    // const resultJson = await result.json();
    console.log("resultJson:", result);

    return {
      ok: true,
      message: "Signup completed",
      data: result
    };
  }
  catch (error) {
    console.log("Error while signup:", error);
    return {
      ok: false,
      error: error,
      message: "Error while signup"
    };
  }
}

export const attachPaymentMethodToCustomer = async (email: string, paymentMethodId: string) => {
  try {
    const result = await SupabaseEdgeFetchPost(
      '/bokun/attachPaymentMethodToCustomer',
      {
        email: email,
        paymentMethodId: paymentMethodId
      }
    );
    // const resultJson = await result.json();
    console.log("resultJson:", result);

    return {
      ok: true,
      message: "Payment method attached to customer",
      data: result
    };
  }
  catch (error) {
    console.log("Error while attaching payment method to customer:", error);
    return {
      ok: false,
      error: error,
      message: "Error while attaching payment method to customer"
    };
  }
}