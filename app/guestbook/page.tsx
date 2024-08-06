import { auth } from 'app/auth';
import { getGuestbookEntries } from 'app/db/queries';
import { SignIn, SignOut } from './buttons';
import { Suspense } from 'react';
import Form from './form';
import Script from 'next/script'

export const metadata = {
  title: 'Guestbook',
  description: 'Sign my guestbook and leave your mark.',
};

export default function GuestbookPage() {
  return (
    <>
      <section>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">
          don't sign my guestbook
        </h1>
        <Suspense>
          <GuestbookForm />
          <GuestbookEntries />
        </Suspense>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/4_9UbOxoNMM?si=MBlpMaxWMzpFxCzk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    
      </section>

      <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        Privacy Notice
      </h1>
      
      {/* Language Drop-down and Privacy Notice Container */}
      <div className="ot-privacy-notice-language-dropdown-container"></div>
      <div
        id="otnotice-650d6e7d-98d2-445d-a08f-5715472a7f59"
        className="otnotice"
      ></div>

      {/* Load the OneTrust Privacy Notice script */}
      <Script 
        src="https://privacyportal-uat-cdn.onetrust.com/privacy-notice-scripts/otnotice-1.0.min.js" 
        strategy="beforeInteractive" 
        id="otprivacy-notice-script"
      />

      {/* Initialize OneTrust Privacy Notice */}
      <Script
        id="initialize-privacy-notice"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (window.OneTrust && window.OneTrust.NoticeApi) {
                window.OneTrust.NoticeApi.Initialized.then(function() {
                  window.OneTrust.NoticeApi.LoadNotices([
                    "https://privacyportal-uat-cdn.onetrust.com/storage-container/626cb470-8339-46fe-8f28-73343104d92e/privacy-notices/650d6e7d-98d2-445d-a08f-5715472a7f59/draft/privacynotice.json"
                  ]);
                }).catch((error) => {
                  console.error('Error initializing OneTrust:', error);
                });
              } else {
                console.error('OneTrust API is not available');
              }
            })();
          `,
        }}
      />
    </section>
    
    </>
    
  );
}

async function GuestbookForm() {
  let session = await auth();

  return session?.user ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <SignIn />
  );
}

async function GuestbookEntries() {
  let entries = await getGuestbookEntries();

  if (entries.length === 0) {
    return null;
  }

  return entries.map((entry) => (
    <div key={entry.id} className="flex flex-col space-y-1 mb-4">
      <div className="w-full text-sm break-words">
        <span className="text-neutral-600 dark:text-neutral-400 mr-1">
          {entry.created_by}:
        </span>
        {entry.body}
      </div>
    </div>
  ));
}
