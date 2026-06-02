<template>
  <!-- Trigger button -->
  <div class="left-ctas">
    <button class="cta cta-message" type="button" @click="open">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 5 L20 5 Q22 5 22 7 L22 16 Q22 18 20 18 L14 18 L9 22 L9 18 L4 18 Q2 18 2 16 L2 7 Q2 5 4 5 Z" fill="rgba(57,212,192,0.12)" />
        <circle class="msg-dot" cx="8" cy="11.5" r="1.3" fill="currentColor" />
        <circle class="msg-dot" cx="12" cy="11.5" r="1.3" fill="currentColor" style="animation-delay:.2s" />
        <circle class="msg-dot" cx="16" cy="11.5" r="1.3" fill="currentColor" style="animation-delay:.4s" />
      </svg>
      <span>Let's build something</span>
    </button>
  </div>

  <!-- Modal -->
  <Teleport to="body">
    <div class="msg-modal" :class="{ show: isOpen }" role="dialog" aria-modal="true" aria-labelledby="msgModalTitle" :aria-hidden="!isOpen" @click.self="close">
      <div class="msg-modal-card" role="document">
        <button type="button" class="msg-modal-close" aria-label="close" @click="close">×</button>

        <!-- Mode toggle -->
        <div class="mode-toggle">
          <button class="mode-btn" :class="{ active: mode === 'client' }" @click="mode = 'client'">🛠 Working together</button>
          <button class="mode-btn" :class="{ active: mode === 'recruiter' }" @click="mode = 'recruiter'">👤 I'm a recruiter</button>
        </div>

        <!-- CLIENT MODE -->
        <template v-if="mode === 'client'">
          <div class="msg-modal-head">
            <span class="msg-modal-spark"></span>
            <h2 class="msg-modal-title" id="msgModalTitle">let's work together</h2>
          </div>
          <p class="msg-modal-sub">Tell me what you're building — I'll read everything and write back personally.</p>
          <form class="msg-form" novalidate @submit.prevent="submitClient">
            <div class="msg-field">
              <label for="msgName">Your name <span class="msg-req">*</span></label>
              <input class="msg-input" :class="{ error: errors.name }" id="msgName" v-model="form.name" type="text" autocomplete="name" maxlength="80" placeholder="Alex Rivera" @input="errors.name = false">
            </div>
            <div class="msg-field">
              <label for="msgEmail">Your email <span class="msg-req">*</span></label>
              <input class="msg-input" :class="{ error: errors.email }" id="msgEmail" v-model="form.email" type="email" autocomplete="email" maxlength="120" placeholder="alex@company.com" @input="errors.email = false">
            </div>
            <div class="msg-field">
              <label for="msgProject">Project description <span class="msg-req">*</span></label>
              <textarea class="msg-textarea" :class="{ error: errors.project }" id="msgProject" v-model="form.project" maxlength="2000" placeholder="The problem, the goal, tech/timeline notes." @input="errors.project = false"></textarea>
            </div>
            <div class="msg-field">
              <label for="msgBudget">Budget range <span class="msg-req">*</span></label>
              <select class="msg-select" :class="{ error: errors.budget }" id="msgBudget" v-model="form.budget" @change="errors.budget = false">
                <option value="" disabled>pick a ballpark</option>
                <option v-for="opt in budgetOptions" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="msg-field">
              <label for="msgTimeline">Timeline <span class="msg-hint">— start / ship?</span></label>
              <input class="msg-input" id="msgTimeline" v-model="form.timeline" type="text" maxlength="120" placeholder="e.g. kick off next month, ship by Q3">
            </div>
            <div class="msg-form-actions">
              <button type="button" class="msg-cancel" @click="close">Cancel</button>
              <button type="submit" class="msg-submit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 L11 13" /><path d="M22 2 L15 22 L11 13 L2 9 Z" /></svg>
                Send it over
              </button>
            </div>
            <p class="msg-footnote">Opens your mail app, pre-filled. Or email <code>hello@thuso.dev</code> directly.</p>
          </form>
        </template>

        <!-- RECRUITER MODE -->
        <template v-else>
          <div class="msg-modal-head">
            <span class="msg-modal-spark recruiter-spark"></span>
            <h2 class="msg-modal-title recruiter-title" id="msgModalTitle">hire thuso</h2>
          </div>
          <p class="msg-modal-sub">Vue.js · React · TypeScript · WebRTC · 5+ years shipping real products end-to-end. Based in Johannesburg, open to remote.</p>

          <div class="cv-box">
            <div class="cv-icon">📄</div>
            <div class="cv-text">
              <strong>CV available on request</strong>
              <span>Click below and Thuso will send it over personally.</span>
            </div>
          </div>

          <form class="msg-form" novalidate @submit.prevent="submitRecruiter">
            <div class="msg-field">
              <label for="rName">Your name <span class="msg-req">*</span></label>
              <input class="msg-input" :class="{ error: rErrors.name }" id="rName" v-model="rForm.name" type="text" autocomplete="name" maxlength="80" placeholder="Sarah Chen" @input="rErrors.name = false">
            </div>
            <div class="msg-field">
              <label for="rEmail">Your work email <span class="msg-req">*</span></label>
              <input class="msg-input" :class="{ error: rErrors.email }" id="rEmail" v-model="rForm.email" type="email" autocomplete="email" maxlength="120" placeholder="sarah@company.com" @input="rErrors.email = false">
            </div>
            <div class="msg-field">
              <label for="rCompany">Company <span class="msg-req">*</span></label>
              <input class="msg-input" :class="{ error: rErrors.company }" id="rCompany" v-model="rForm.company" type="text" maxlength="120" placeholder="e.g. Acme Corp" @input="rErrors.company = false">
            </div>
            <div class="msg-field">
              <label for="rRole">Role you're hiring for <span class="msg-req">*</span></label>
              <input class="msg-input" :class="{ error: rErrors.role }" id="rRole" v-model="rForm.role" type="text" maxlength="120" placeholder="e.g. Senior Frontend Engineer" @input="rErrors.role = false">
            </div>
            <div class="msg-field">
              <label for="rNote">Anything else? <span class="msg-hint">— optional</span></label>
              <input class="msg-input" id="rNote" v-model="rForm.note" type="text" maxlength="300" placeholder="Remote, hybrid, salary range, stack…">
            </div>
            <div class="msg-form-actions">
              <button type="button" class="msg-cancel" @click="close">Cancel</button>
              <button type="submit" class="msg-submit recruiter-submit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 L11 13" /><path d="M22 2 L15 22 L11 13 L2 9 Z" /></svg>
                Request CV
              </button>
            </div>
            <p class="msg-footnote">Opens your mail app pre-filled. Thuso will reply with his CV personally.</p>
          </form>
        </template>

      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const mode = ref<'client' | 'recruiter'>('client')

// Client form
const form = reactive({ name: '', email: '', project: '', budget: '', timeline: '' })
const errors = reactive({ name: false, email: false, project: false, budget: false })

// Recruiter form
const rForm = reactive({ name: '', email: '', company: '', role: '', note: '' })
const rErrors = reactive({ name: false, email: false, company: false, role: false })

const isZAR = ref(false)
onMounted(() => {
  const zarTimezones = new Set(['Africa/Johannesburg', 'Africa/Windhoek'])
  isZAR.value = zarTimezones.has(Intl.DateTimeFormat().resolvedOptions().timeZone)
})

const budgetOptions = computed(() => isZAR.value
  ? [
    "Under R20k — small tweak / one-off",
    "R20k – R90k — a weekend build",
    "R90k – R280k — a focused sprint",
    "R280k – R750k — a proper product slice",
    "R750k+ — serious scope",
    "Not sure yet — let's figure it out",
  ]
  : [
    "Under $1k — small tweak / one-off",
    "$1k – $5k — a weekend build",
    "$5k – $15k — a focused sprint",
    "$15k – $40k — a proper product slice",
    "$40k+ — serious scope",
    "Not sure yet — let's figure it out",
  ]
)

function open() {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}
function close() {
  isOpen.value = false
  document.body.style.overflow = ''
}

function submitClient() {
  errors.name = !form.name.trim()
  errors.email = !form.email.trim()
  errors.project = !form.project.trim()
  errors.budget = !form.budget
  if (errors.name || errors.email || errors.project || errors.budget) return
  const subj = `Project inquiry — ${form.name}`
  const body = [
    'Hi Thuso,', '', "I'd like to chat about a project.", '',
    `Name: ${form.name}`, `Email: ${form.email}`, `Budget: ${form.budget}`,
    form.timeline ? `Timeline: ${form.timeline}` : '',
    '', 'Project:', form.project, '', 'Thanks,', form.name
  ].filter(Boolean).join('\n')
  window.location.href = `mailto:hello@thuso.dev?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`
  setTimeout(close, 400)
}

function submitRecruiter() {
  rErrors.name = !rForm.name.trim()
  rErrors.email = !rForm.email.trim()
  rErrors.company = !rForm.company.trim()
  rErrors.role = !rForm.role.trim()
  if (rErrors.name || rErrors.email || rErrors.company || rErrors.role) return
  const subj = `CV Request — ${rForm.role} at ${rForm.company}`
  const body = [
    'Hi Thuso,',
    '',
    `I'm ${rForm.name} from ${rForm.company}. We're hiring for a ${rForm.role} role and I'd love to review your CV.`,
    '',
    `My email: ${rForm.email}`,
    rForm.note ? `Notes: ${rForm.note}` : '',
    '',
    'Could you send your CV over?',
    '',
    `Thanks,`,
    rForm.name,
  ].filter(Boolean).join('\n')
  window.location.href = `mailto:hello@thuso.dev?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`
  setTimeout(close, 400)
}

onMounted(() => {
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen.value) close() })
})
</script>

<style scoped>
/* Trigger */
.left-ctas {
  position: fixed;
  left: 20px;
  top: var(--left-ctas-top, 240px);
  width: var(--dt-width);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9997;
  transition: top .5s cubic-bezier(.22, 1, .36, 1);
}

.left-ctas .cta {
  width: 100%;
  font-size: .92rem;
  padding: 10px 12px;
}

.cta-message {
  background: linear-gradient(135deg, rgba(57, 212, 192, .28), rgba(63, 185, 80, .22));
  box-shadow: 0 6px 24px rgba(57, 212, 192, .18);
  animation: msg-breathe 5.2s ease-in-out infinite;
  border-color: rgba(57, 212, 192, .45);
}

.cta-message:hover {
  background: linear-gradient(135deg, rgba(57, 212, 192, .42), rgba(63, 185, 80, .35));
  box-shadow: 0 14px 36px rgba(57, 212, 192, .4);
  border-color: rgba(255, 255, 255, .6);
}

@keyframes msg-breathe {
  0%, 100% { box-shadow: 0 6px 24px rgba(57, 212, 192, .18); }
  50% { box-shadow: 0 10px 30px rgba(63, 185, 80, .28); }
}

.cta-message svg { color: var(--c-teal); }

:global(.msg-dot) {
  animation: msg-dot-pulse 1.4s ease-in-out infinite;
}

@keyframes msg-dot-pulse {
  0%, 100% { opacity: .9; transform: translateY(0); }
  50% { opacity: .35; transform: translateY(-1px); }
}

/* Modal */
.msg-modal {
  position: fixed;
  inset: 0;
  background: rgba(5, 7, 11, .78);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10003;
  opacity: 0;
  pointer-events: none;
  transition: opacity .35s ease;
  padding: 18px;
}

.msg-modal.show {
  opacity: 1;
  pointer-events: auto;
}

.msg-modal-card {
  width: min(520px, calc(100vw - 36px));
  max-height: calc(100vh - 36px);
  overflow-y: auto;
  background: linear-gradient(180deg, rgba(18, 22, 30, .98), rgba(8, 10, 14, .98));
  border: 1px dashed rgba(57, 212, 192, .45);
  border-radius: 16px;
  padding: 22px 22px 18px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, .7), 0 0 0 1px rgba(255, 255, 255, .05) inset, 0 0 60px rgba(57, 212, 192, .15);
  transform: translateY(14px) scale(.96);
  transition: transform .45s cubic-bezier(.34, 1.56, .64, 1);
  color: var(--chalk);
  position: relative;
}

.msg-modal.show .msg-modal-card {
  transform: translateY(0) scale(1);
}

.msg-modal-close {
  position: absolute;
  top: 10px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, .15);
  background: rgba(255, 255, 255, .04);
  color: var(--chalk);
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1), background .3s;
}

.msg-modal-close:hover {
  transform: rotate(90deg) scale(1.08);
  background: rgba(57, 212, 192, .2);
}

/* Mode toggle */
.mode-toggle {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  background: rgba(255,255,255,.04);
  border: 1px dashed rgba(255,255,255,.12);
  border-radius: 999px;
  padding: 4px;
}

.mode-btn {
  flex: 1;
  padding: 8px 12px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: var(--dim);
  font-family: 'Caveat', cursive;
  font-size: .95rem;
  cursor: pointer;
  transition: background .25s, color .25s;
  white-space: nowrap;
}

.mode-btn.active {
  background: rgba(57, 212, 192, .2);
  color: var(--chalk);
  border: 1px dashed rgba(57, 212, 192, .45);
}

.mode-btn:not(.active):hover {
  background: rgba(255,255,255,.06);
  color: var(--chalk);
}

.msg-modal-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}

.msg-modal-spark {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--c-teal);
  box-shadow: 0 0 12px var(--c-teal);
  animation: msg-breathe 1.6s ease-in-out infinite;
}

.recruiter-spark {
  background: var(--c-green);
  box-shadow: 0 0 12px var(--c-green);
}

.msg-modal-title {
  font-family: 'Permanent Marker', cursive;
  font-size: 1.4rem;
  color: var(--c-teal);
  text-shadow: 0 0 14px rgba(57, 212, 192, .45);
  letter-spacing: 1px;
  text-transform: lowercase;
  line-height: 1;
}

.recruiter-title {
  color: var(--c-green);
  text-shadow: 0 0 14px rgba(63, 185, 80, .45);
}

.msg-modal-sub {
  font-family: 'Caveat', cursive;
  font-size: 1.15rem;
  color: var(--dim);
  margin: 2px 0 14px;
  line-height: 1.35;
}

/* CV box */
.cv-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(63, 185, 80, .08);
  border: 1px dashed rgba(63, 185, 80, .35);
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 14px;
}

.cv-icon {
  font-size: 1.8rem;
  flex-shrink: 0;
}

.cv-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: 'Caveat', cursive;
}

.cv-text strong {
  font-size: 1.1rem;
  color: var(--c-green);
}

.cv-text span {
  font-size: .95rem;
  color: var(--dim);
}

.msg-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.msg-field label {
  font-family: 'Caveat', cursive;
  font-size: 1rem;
  color: var(--chalk);
  padding-left: 4px;
}

.msg-req { color: var(--c-red); }

.msg-hint {
  font-size: .82rem;
  color: var(--dim-2);
  margin-left: 4px;
}

.msg-input,
.msg-textarea,
.msg-select {
  font-family: 'Caveat', cursive;
  font-size: 1.2rem;
  color: var(--chalk);
  background: rgba(255, 255, 255, .04);
  border: 1px dashed rgba(255, 255, 255, .18);
  border-radius: 10px;
  padding: 9px 12px;
  outline: none;
  transition: border-color .3s, background .3s, box-shadow .3s;
  width: 100%;
}

.msg-select { font-size: .95rem; }

.msg-input:focus,
.msg-textarea:focus,
.msg-select:focus {
  border-color: var(--c-teal);
  background: rgba(57, 212, 192, .06);
  box-shadow: 0 0 0 2px rgba(57, 212, 192, .18);
}

.msg-input.error,
.msg-textarea.error,
.msg-select.error {
  border-color: var(--c-red);
  box-shadow: 0 0 0 2px rgba(255, 99, 99, .25);
}

.msg-textarea {
  min-height: 96px;
  resize: vertical;
  line-height: 1.35;
}

.msg-select {
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238b949e' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
}

.msg-select option {
  font-size: .95rem;
  background: #0d1117;
  color: var(--chalk);
}

.msg-form-actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.msg-submit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  font-family: 'Caveat', cursive;
  font-weight: 700;
  font-size: 1.1rem;
  border: 1px dashed rgba(57, 212, 192, .55);
  background: linear-gradient(135deg, rgba(57, 212, 192, .3), rgba(63, 185, 80, .25));
  color: var(--chalk);
  cursor: pointer;
  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1), box-shadow .3s;
  box-shadow: 0 6px 18px rgba(57, 212, 192, .2);
}

.msg-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(57, 212, 192, .4);
}

.recruiter-submit {
  border-color: rgba(63, 185, 80, .55);
  background: linear-gradient(135deg, rgba(63, 185, 80, .3), rgba(57, 212, 192, .2));
  box-shadow: 0 6px 18px rgba(63, 185, 80, .2);
}

.recruiter-submit:hover {
  box-shadow: 0 12px 28px rgba(63, 185, 80, .4);
}

.msg-submit svg { width: 16px; height: 16px; }

.msg-cancel {
  background: transparent;
  border: 1px dashed rgba(255, 255, 255, .18);
  color: var(--dim);
  padding: 10px 16px;
  border-radius: 999px;
  font-family: 'Caveat', cursive;
  font-size: 1rem;
  cursor: pointer;
  transition: background .3s, color .3s;
}

.msg-cancel:hover {
  background: rgba(255, 255, 255, .04);
  color: var(--chalk);
}

.msg-footnote {
  font-family: 'Caveat', cursive;
  font-size: 1.1rem;
  color: var(--dim-2);
  margin-top: 10px;
  text-align: center;
  line-height: 1.35;
}

.msg-footnote code {
  font-family: 'SF Mono', monospace;
  font-size: .85rem;
  color: var(--c-teal);
  background: rgba(57, 212, 192, .1);
  padding: 1px 6px;
  border-radius: 4px;
}

@media (max-width: 820px) {
  .left-ctas {
    position: static;
    width: auto;
    margin: 6px auto 0;
    padding: 15px 0 25px;
    align-items: center;
  }
  .left-ctas .cta {
    font-size: 1rem;
    padding: 11px 18px;
    width: auto;
  }
}

@media (max-width: 480px) {
  .msg-modal-card {
    width: 100%;
    padding: 18px 16px 14px;
  }
  .msg-form-actions {
    flex-direction: column-reverse;
  }
  .msg-form-actions button {
    width: 100%;
    justify-content: center;
  }
  .mode-toggle {
    flex-direction: column;
    border-radius: 12px;
  }
}
</style>
