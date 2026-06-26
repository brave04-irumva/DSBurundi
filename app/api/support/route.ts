import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, email, phone, identityNumber, supportType, paymentMethod, 
      financialDetails, spiritualDetails, volunteerDetails, materialDetails, notes 
    } = body;

    if (!name || !email || !phone || !identityNumber || !supportType) {
      return NextResponse.json(
        { success: false, error: "Missing required profile registration metadata parameters." },
        { status: 400 }
      );
    }

    console.log("📥 [SUPPORT ACTION INTENT PARSED]:");
    console.log(`👤 Name:       ${name}`);
    console.log(`🪪 Document:   ${identityNumber}`);
    console.log(`💡 Type:       ${supportType.toUpperCase()}`);

    // Route tracking parameters cleanly down to text logs
    if (supportType === "prayer") {
      console.log(`🙏 Prayer Plan: ${spiritualDetails}`);
    } else if (supportType === "volunteer") {
      console.log(`🙋 Volunteer: ${volunteerDetails}`);
    } else if (supportType === "material") {
      console.log(`📦 Material:  ${materialDetails}`);
    } else if (supportType === "money" && financialDetails) {
      console.log("💵 [FINANCIAL SET VALUES]:");
      console.log(`   Amount:     ${financialDetails.amountFbu} BIF`);
      console.log(`   Channel:    ${paymentMethod}`);
      
      if (paymentMethod === "BANCOBU" || paymentMethod === "BCB") {
        console.log(`   Card Holder:${financialDetails.cardName}`);
        console.log(`   Card Token: ${financialDetails.cardNumber.replace(/\d(?=\d{4})/g, "*")}`);
      } else if (paymentMethod === "ECOCASH" || paymentMethod === "LUMICASH") {
        console.log(`   Source Line:  ${financialDetails.mobileNumber}`);
        console.log(`   Ref Token ID: ${financialDetails.transactionReference}`);
      }
    }
    
    if (notes) console.log(`📝 Extra Notes: ${notes}`);
    console.log("-----------------------------------------");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server processing failure." },
      { status: 500 }
    );
  }
}