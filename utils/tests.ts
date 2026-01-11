import { SupabaseEdgeFetchPost } from "./supabase"

export const Test___SendExampleEmail = async () => {
  const data = await SupabaseEdgeFetchPost("/bokun/test-send-example-email", {
    email: "zlatkoflash@gmail.com"
  });
  const resultText = await data.text();

  const resultJSON = JSON.parse(resultText);

  console.log("data2:", resultJSON);
}