export function MagicLinkEmailTemplate({
  appName,
  url,
  expiresInMinutes,
}: {
  appName: string
  url: string
  expiresInMinutes: number
}) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<meta name="x-apple-disable-message-reformatting"/>
		<title>${escapeHtml(appName)} – Magic link</title> 
	</head>
	<body style="margin:0;padding:0;background-color:#ffffff">
		<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="background:#ffffff">
			<tr>
				<td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif;color:#3c4149">
					<div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Your magic link for ${escapeHtml(appName)}</div>
					<table role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;margin:0 auto;padding:24px 0 48px">
						<tr>
							<td>
								<div style="display:flex;align-items:center;gap:12px">
									<img src="${process.env.BETTER_AUTH_URL}/assets/logo.png" alt="${escapeHtml(appName)}" width="42" height="42" style="display:block;border:none;outline:none;border-radius:8px"/>
								</div>
								<h1 style="font-size:24px;letter-spacing:-0.3px;line-height:1.3;font-weight:600;color:#222;margin:18px 0 0">Your magic link for ${escapeHtml(appName)}</h1>

								<p style="font-size:15px;line-height:1.6;margin:18px 0 0;color:#3c4149">Use the button below to sign in. This link and code are valid for the next ${expiresInMinutes} minutes.</p>

								<table role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="padding:22px 0 22px">
									<tr>
										<td>
											<a href="${escapeAttribute(url)}" target="_blank" style="background-color:#305af3;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;font-size:15px;text-align:center;display:inline-block;padding:12px 20px">Sign in to ${escapeHtml(appName)}</a>
										</td>
									</tr>
								</table>

								<p style="font-size:15px;line-height:1.6;margin:0 0 12px;color:#3c4149">If the button doesn't work, copy and paste this link into your browser:</p>
								<p style="word-break:break-all;color:#111827;font-size:14px;margin:0 0 16px"><a href="${escapeAttribute(url)}" style="color:#1f2937;text-decoration:underline" target="_blank">${escapeHtml(url)}</a></p>
								<hr style="width:100%;border:none;border-top:1px solid #e5e7eb;margin:32px 0 16px"/>
								<p style="color:#9ca3af;font-size:13px;margin:0">You're receiving this email because a sign-in was requested for ${escapeHtml(appName)}. If you didn't request this, you can safely ignore it.</p>
								<p style="color:#9ca3af;font-size:13px;margin:8px 0 0">© ${new Date().getFullYear()} ${escapeHtml(appName)}.</p>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>`
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function escapeAttribute(input: string) {
  return escapeHtml(input).replace(/[\r\n]/g, "")
}
