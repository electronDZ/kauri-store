Here is the comprehensive structural breakdown for your project, updated with your specific design details. I have organized this so you can directly translate it into your report and your coding tasks.

### 1. Final Concept Clustering

I have updated the clusters to reflect the "Secret Workforce" aspect and the specific 4-module design of the robot.

**Cluster A: The Front-End Experience (Customer Facing)**

* **The "Kauri Home" Interface:** A welcoming, multi-lingual (IT/DE/EN) hub.
* **Soft Marketing:** Products are presented with rich descriptions and "soft" persuasion rather than aggressive sales tactics.
* **Edutainment:** A split path for "Learning" that offers "Trash to Treasure" stories for adults and interactive games for kids.
* **The Style Consultant:** A personalized "Skin & Style" module that uses (simulated) skin scanning to recommend specific outfit combinations, reducing decision fatigue.

**Cluster B: The Back-End Operations (Staff/Owner Facing)**

* **The "Secret" Auditor:** While the robot appears to be idling or assisting, it secretly navigates the store to check for **missing** or **misplaced** items.
* **Live Dashboard (Mobile App):** The owner/manager receives a live feed of store health—customer headcounts, potential theft alerts (missing items), and misplaced stock notifications.
* **Biometric Access Control:** The robot is "unlocked" for work via Face Recognition, ensuring only authorized staff can activate the sales assistant mode.

---

### 2. Narrative Design Strategy

*You asked: How does the robot transition and trigger stories?*

**The "Attract & Engage" Loop (Solution):**

1. **Passive Mode (The Entertainer):** When no user is interacting, the robot plays a silent "Attract Loop" on its screen—showing visually satisfying clips of recycled materials or the "Trash to Treasure" animation. This draws people in.
2. **Transition to Active Assistant:**
* **Trigger 1 (Proximity):** When the robot detects a person (simulated via clicking the screen in your prototype), it wakes up, greets them in the default language, and offers the 4 main menu options.
* **Trigger 2 (Product Interaction):** In the "Explore" or "Pay" mode, if a user brings a garment close (simulated by selecting a product), the robot immediately shifts to "Storyteller Mode," pulling up the specific eco-story of that item (e.g., "This shirt used to be 3 plastic bottles").



---

### 3. Professional Explanation for "Missing" AI

*You asked: How to explain the simulated Face ID and Skin Scan during testing?*

**The "Wizard of Oz" Protocol:**
When presenting or testing, you do not say "It doesn't work yet." You say:

> *"This is a mid-fidelity prototype using the **Wizard of Oz** technique for AI features. We are simulating the 'happy path' of the Face Recognition and Skin Analysis algorithms to demonstrate the user flow and interface logic without the latency of real-time processing."*

**On the Interface (Text Prompt):**
Instead of just a button saying "Scan," add a small caption:

* *"[Demo Mode]: Simulating successful scan..."*
* *"AI Analysis Active (Pre-calculated result for Demo)"*

---

### 4. Updated Requirements (For Report & Coding)

**Functional Requirements (The Robot - Front End)**

* **FR-01 (Login):** System must simulate a Face Recognition login sequence for staff to activate the robot.
* 
**FR-02 (Localization):** Home screen must allow toggling between English, Italian, and German.


* **FR-03 (Navigation):** Home screen must display 4 distinct modules: Learn, Explore, Pay, Style Match.
* **FR-04 (Education):** "Learn" module must feature a "Trash to Treasure" story player and a separate game interface for children.
* **FR-05 (Catalog):** "Explore" module must allow filtering/searching products and viewing detailed "soft marketing" descriptions.
* 
**FR-06 (Payment):** "Pay" module must simulate a "scan-to-pay" workflow where a product is detected and payment is confirmed.


* **FR-07 (Personalization):** "Style Match" module must offer two input methods: Manual Tone Selection or (Simulated) Camera Scan, returning a curated outfit list.

**Functional Requirements (The Mobile App - Back End)**

* **FR-08 (Dashboard):** App must display live counters for "People in Store" and "Active Alerts."
* **FR-09 (Inventory Alerts):** App must list specific notifications for "Item Missing" (potential theft) and "Item Misplaced" (organization).
* **FR-10 (Staff Management):** App must allow the registration of staff profiles for the robot's Face ID database.

**Non-Functional Requirements**

* **NFR-01 (Fidelity):** AI inputs (Face/Skin) must be simulated with near-zero latency for the demo.
* **NFR-02 (Privacy):** The "Secret Audit" mode must not record video of customers, only data points (counts/locations), to comply with ethical standards.

---

### 5. User Stories (To Guide Your Coding)

**Story 1: The Store Owner (Mobile App)**

> "As the **Store Owner**, I want to see a live dashboard of 'missing item' alerts on my phone, so that I can prevent theft and restock shelves without constantly walking the floor myself."
> *Coding Task:* Create a mobile dashboard frame with a list of "Alert Cards" (e.g., "Warning: Blue Jacket missing from Aisle 3").

**Story 2: The Sales Assistant (Login Flow)**

> "As a **Sales Assistant**, I want to unlock the robot simply by looking at it (Face Rec), so that I can start my shift quickly without remembering complex passwords."
> *Coding Task:* Create a "Scanning Face..." animation screen that auto-redirects to the "Welcome" Home screen after 2 seconds.

**Story 3: The Sustainable Shopper (Robot - Style)**

> "As a **Shopper**, I want to scan my skin tone and immediately see which eco-friendly clothes match my complexion, so I can buy a 'clever' outfit without trying on 20 different items."
> *Coding Task:* Create a "Style Match" flow: [Camera View Overlay] -> [Processing Animation] -> [Results Page with 3 Outfit Combinations].

**Story 4: The Parent (Robot - Learn)**

> "As a **Parent**, I want my child to play an educational recycling game on the robot, so they are entertained and learning while I browse the 'Explore' section."
> *Coding Task:* Create a simple "Drag and Drop" game screen (put the trash in the right bin) in the "Learn" section.

**Story 5: The "Fast" Shopper (Robot - Pay)**

> "As a **Customer**, I want to pay for an item I found in the 'Explore' menu instantly by scanning it at the robot, avoiding the main queue."
> *Coding Task:* Add a "Buy Now" button on the Product Detail page that links directly to the "Tap to Pay" success screen.

### 6. What to Change from Previous Ideas?

1. **Remove manual login:** Replace any keypad/password login screens with the **Face ID simulation**.
2. **Simplify the Dashboard:** The whiteboard showed "Learn/Prod/Pay/Skin" *inside* the Sales/Manager view. **Change this:** These 4 features are now the **Robot's** public face. The **Mobile App** is strictly for the "Secret" auditing data (Counts, Theft, Misplaced items).
3. **Language Toggle:** Ensure the language flags/toggles are prominent on the very first "Welcome" screen of the robot.

