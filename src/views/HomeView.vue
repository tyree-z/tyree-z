<template>
  <ParticleCanvas class="w-full h-full blur-sm" />
  <NavBar />
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="grid grid-cols-1 gap-3">
        <HandwrittenName class="h-20 place-self-center" />
        <div class="max-w-md place-self-center">
          <div class="py-6">
            <div class="text-base-content">
              <ul class="list-disc place-self-center prevent-select">
                <li class="mb-2 flex items-center justify-center">
                  <a href="https://git.io/JDv5M" class="flex items-center heroSocialLink" id="viewGithub">
                    <IconBrandGithub :size="24" :stroke-width="1.5" class="mr-1 hover-github" />
                    <p>tyree-z</p>
                  </a>
                </li>
                <li class="mb-2 flex items-center justify-center">
                  <a href="https://www.instagram.com/tyree.zacharopoulos/" class="flex items-center heroSocialLink" id="viewInstagram">
                    <IconBrandInstagram :size="24" :stroke-width="1.5" class="mr-1 hover-instagram" />
                    <p>tyree.zacharopoulos</p>
                  </a>
                </li>
                <li class="flex items-center justify-center">
                  <a
                    href="#"
                    class="protectedEmail flex items-center heroSocialLink"
                    id="viewEmail"
                    data-name="tyree+website"
                    data-domain="tyree"
                    data-tld="ca"
                    @click.prevent="sendEmail"
                  >
                    <IconAt :size="24" :stroke-width="1.5" class="mr-1 hover-at" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { IconBrandGithub, IconBrandInstagram, IconAt } from '@tabler/icons-vue';
import ParticleCanvas from '@/components/Content/ParticleCanvas.vue';
import HandwrittenName from '@/components/Content/HandwrittenName.vue';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

const sendEmail = () => {
  const name = 'tyree+website';
  const domain = 'tyree';
  const tld = 'ca';
  const subject = 'Hello :)';
  const body = 'Hi Tyree, ';
  const emailAddress = `${name}@${domain}.${tld}`;
  // Ask User If They Want To Open Their Mail Client.. Prevent Annoying Mis-Clicks
  if (confirm('Open your Email?') == true) {
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  } else {
    console.log('Cancelled "mailto:" prompt');
  }
};
</script>

<style scoped>
/*
This Is Here So "p" Can Fade Out.. "p:hover" Cuts Out As Soon As Cursor Leaves "p"
*/
p {
  transition: 0.7s;
}

/*
Text To The Right Of Icons. Cursor Hover and Change Color
*/
p:hover {
  color: rgb(255, 255, 255);
  text-decoration: none;
  cursor: url('data:image/x-icon;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAFAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAFAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAABMAAAAcAAAAHAAAABwAAAAcAAAAHAAAABwAAAAcAAAAHAAAABMAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAAJgAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAJgAAABMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAABwAAAA1AAAATAAAAEwAAABMAAAATAAAAEwAAABMAAAATAAAAEwAAAA1AAAAHAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAUwAAAEEAAAAlAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAP///////////////////////////////////////////wAAAP8AAABVAAAASwAAAC8AAAATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAA////////////////////////////////////////////AAAA/wAAAFUAAABSAAAAOAAAABwAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAP//////////////////////////////////////////////////////AAAA/wAAAFQAAABBAAAAJQAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAA//////////////////////////////////////////////////////8AAAD/AAAAVQAAAEsAAAAvAAAAEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAP///////////////////////////////////////////////////////////wAAAP8AAABVAAAAUgAAADYAAAAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAMAAAA/////////////////////////////////////////////////////////////////wAAAP8AAABUAAAAOAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAP//////////////////////////////////////////////////////////////////////AAAA/wAAAFQAAAA4AAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAA//////////////////////////////////////////////////////////////////////8AAAD/AAAAUQAAADUAAAAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////wAAAP///////////////////////////////////////////////////////////wAAAP8AAABIAAAALAAAABMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////AAAA////////////////////////////////////////////////////////////AAAA/wAAADUAAAAcAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////wAAAP8AAAD///////////////////////////////////////////8AAAD///////////8AAAD/AAAAHwAAAAwAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP8AAAD/AAAACAAAAP///////////wAAAP///////////wAAAP///////////wAAAP//////AAAA/wAAABUAAAAMAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAA////////////AAAA////////////AAAA////////////AAAA/wAAAP8AAAAPAAAABgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////8AAAD///////////8AAAD/AAAA/wAAAP8AAAAiAAAABgAAAAMAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP///////////wAAAP8AAABUAAAAOAAAABwAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////AAAA/wAAAFEAAAA1AAAAGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////8AAAD/AAAARQAAACwAAAATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////wAAAP8AAAAvAAAAHAAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////AAAA/wAAABUAAAAMAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP8AAAAGAAAABgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////////////////////////////////////////////////////////4Af//+AH///gB///wAP//8AD//+AA///gAH//wAB//8AAf/+AAH//AAB//wAAf/8QAP//8AH///AH///4H////h////4f///+H////h////8///8='),
    auto;
}

/*
Displayed Social Usernames Font
*/
.heroSocialLink {
  font-family: 'Moon';
  text-shadow: #000000 0 0 5px;
}

/*
Snapchat. Not Used.. But I'll Keep It :)
*/
a:hover .hover-snapchat {
  color: #fffc00;
}
.hover-snapchat {
  transition: 0.7s;
}

/*
Github. Cursor Hover and Change Color
*/
a:hover .hover-github {
  color: #4078c0;
}
.hover-github {
  transition: 0.7s;
}

/*
Instagram. Cursor Hover and Change Color
*/
a:hover .hover-instagram {
  color: #833ab4;
}
.hover-instagram {
  transition: 0.7s;
}

/*
Email. Cursor Hover and Change Color
*/
a:hover .hover-at {
  color: #fd9800;
}
.hover-at {
  transition: 0.7s;
}

/*
On Hover Change color, Seperate CSS Due To Spam Prevention, Email Scraping Method
*/
a:hover.protectedEmail:after {
  color: rgb(255, 255, 255);
  text-decoration: none;
  cursor: url('data:image/x-icon;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAFAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAFAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAABMAAAAcAAAAHAAAABwAAAAcAAAAHAAAABwAAAAcAAAAHAAAABMAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAAJgAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAJgAAABMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAABwAAAA1AAAATAAAAEwAAABMAAAATAAAAEwAAABMAAAATAAAAEwAAAA1AAAAHAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAUwAAAEEAAAAlAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAP///////////////////////////////////////////wAAAP8AAABVAAAASwAAAC8AAAATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAA////////////////////////////////////////////AAAA/wAAAFUAAABSAAAAOAAAABwAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAP//////////////////////////////////////////////////////AAAA/wAAAFQAAABBAAAAJQAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAA//////////////////////////////////////////////////////8AAAD/AAAAVQAAAEsAAAAvAAAAEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAP///////////////////////////////////////////////////////////wAAAP8AAABVAAAAUgAAADYAAAAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAMAAAA/////////////////////////////////////////////////////////////////wAAAP8AAABUAAAAOAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAP//////////////////////////////////////////////////////////////////////AAAA/wAAAFQAAAA4AAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAA//////////////////////////////////////////////////////////////////////8AAAD/AAAAUQAAADUAAAAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////wAAAP///////////////////////////////////////////////////////////wAAAP8AAABIAAAALAAAABMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////AAAA////////////////////////////////////////////////////////////AAAA/wAAADUAAAAcAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////wAAAP8AAAD///////////////////////////////////////////8AAAD///////////8AAAD/AAAAHwAAAAwAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP8AAAD/AAAACAAAAP///////////wAAAP///////////wAAAP///////////wAAAP//////AAAA/wAAABUAAAAMAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAA////////////AAAA////////////AAAA////////////AAAA/wAAAP8AAAAPAAAABgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////8AAAD///////////8AAAD/AAAA/wAAAP8AAAAiAAAABgAAAAMAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP///////////wAAAP8AAABUAAAAOAAAABwAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////AAAA/wAAAFEAAAA1AAAAGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////8AAAD/AAAARQAAACwAAAATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////wAAAP8AAAAvAAAAHAAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////AAAA/wAAABUAAAAMAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP8AAAAGAAAABgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////////////////////////////////////////////////////////4Af//+AH///gB///wAP//8AD//+AA///gAH//wAB//8AAf/+AAH//AAB//wAAf/8QAP//8AH///AH///4H////h////4f///+H////h////8///8='),
    auto;
}

/*
Email Content: This is what is Displayed to User. Actual Value Is NOT The Same
*/
.protectedEmail:after {
  transition: 0.7s;
  content: 'tyree' '@' attr(data-domain) '.' attr(data-tld);
}

ul li a {
  display: flex;
  align-items: center;
}
ul li a .mr-1 {
  margin-right: 0.5rem; /* Adjust the spacing between icon and text */
}
</style>
