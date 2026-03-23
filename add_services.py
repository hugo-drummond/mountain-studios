#!/usr/bin/env python3
"""Add 4th service to each business type in HEALTH-WELLNESS, FITNESS-SPORT, and EDUCATION categories."""

import re

filepath = '/Users/hugodrummond/agency-backend/app/api/preview/generate/content.ts'

with open(filepath, 'r') as f:
    content = f.read()

# Map: business type name -> (4th service dict as string, indent style)
# HEALTH-WELLNESS uses 6-space indent for service objects (2 for array + 4 for object)
# Actually from reading: health-wellness uses "      {" (6 spaces) inside services array
# Education uses "          {" (10 spaces)

# Let me define the 4th services for each type.
# Format: (business_type_key, service_name, description, tag1, tag2, imageQuery)

health_wellness = [
    ("Dentist",
     "Children's Dentistry",
     "Gentle, child-friendly dental care from first teeth through to teens \u2014 building habits that last a lifetime.",
     "Paediatric", "Preventive Care",
     "colourful children dental chair equipment bright fun room"),

    ("Doctor / GP",
     "Women's & Reproductive Health",
     "Pap smears, contraception, antenatal screening, and menopause management with discretion and care.",
     "Women's Health", "Antenatal",
     "gynaecology examination room ultrasound monitor equipment"),

    ("Physiotherapist",
     "Women's Health Physio",
     "Specialised pelvic floor rehabilitation, pre- and postnatal physio, and incontinence management.",
     "Pelvic Floor", "Postnatal",
     "pelvic floor exercise ball rehabilitation mat physio equipment"),

    ("Chiropractor",
     "Sports Chiropractic",
     "Performance-focused chiropractic care for athletes including biomechanical assessment and injury prevention.",
     "Sports Performance", "Biomechanics",
     "sports biomechanics assessment running gait analysis screen"),

    ("Optometrist",
     "Children's Vision Screening",
     "Early detection of lazy eye, squint, and learning-related vision issues in school-age children.",
     "Paediatric Vision", "Screening",
     "children vision screening chart colourful shapes eye test"),

    ("Hair Salon / Barber",
     "Bridal & Event Styling",
     "Wedding hair, updo styling, and event-ready looks with a trial session and on-location service.",
     "Bridal Hair", "Updo",
     "bridal updo hairstyle pins flowers elegant wedding styling"),

    ("Beauty Salon / Spa",
     "Lash & Brow Artistry",
     "Eyelash extensions, brow lamination, tinting, and microblading for effortlessly defined features.",
     "Lash Extensions", "Brow Lamination",
     "eyelash extensions individual lash application tweezers close-up"),

    ("Massage Therapist",
     "Prenatal & Postnatal Massage",
     "Safe, supportive massage for expectant and new mothers \u2014 easing tension, swelling, and the demands of pregnancy.",
     "Prenatal", "Postnatal",
     "pregnancy massage bolster side-lying support cushions treatment"),

    ("Dietitian / Nutritionist",
     "Gut Health & IBS Management",
     "Low-FODMAP guidance, elimination protocols, and gut microbiome support for digestive conditions.",
     "Gut Health", "Low-FODMAP",
     "gut health fermented foods probiotics kefir sauerkraut jars"),

    ("Psychologist / Therapist",
     "Corporate & Workplace Wellness",
     "EAP sessions, workplace stress debriefings, and organisational wellbeing programmes for businesses.",
     "EAP", "Workplace Wellness",
     "corporate wellness workshop group discussion circle chairs office"),

    ("Speech Therapist",
     "Augmentative & Alternative Communication",
     "AAC device assessment, setup, and training for non-verbal or minimally verbal children and adults.",
     "AAC", "Assistive Technology",
     "AAC communication device tablet symbols buttons touchscreen"),

    ("Occupational Therapist",
     "School Readiness Assessment",
     "Comprehensive assessments for Grade R and Grade 1 readiness covering motor, perceptual, and social skills.",
     "School Readiness", "Perceptual Skills",
     "school readiness assessment worksheet pencil grip shapes child"),

    ("Audiologist",
     "Paediatric Hearing Screening",
     "Newborn and early childhood hearing screening using OAE and ABR technology for early intervention.",
     "Newborn Screening", "Early Intervention",
     "paediatric hearing screening OAE probe infant ear test"),

    ("Podiatrist",
     "Custom Orthotics",
     "Precision-moulded orthotics designed from gait analysis data to correct alignment and relieve chronic pain.",
     "Custom Orthotics", "Gait Analysis",
     "custom orthotic insole moulding tray foot impression podiatry"),

    ("Alternative / Holistic Health",
     "Herbal Medicine & Nutrition",
     "Custom herbal formulations and whole-food nutrition plans addressing inflammation, hormones, and fatigue.",
     "Herbal Medicine", "Nutrition",
     "herbal medicine dried herbs mortar pestle tincture bottles wooden"),
]

fitness_sport = [
    ("Personal Trainer",
     "Small Group Training",
     "High-energy sessions of 4\u20136 people combining strength and conditioning at a fraction of the one-on-one price.",
     "Small Group", "Strength & Conditioning",
     "small group training kettlebell circuit barbell gym floor"),

    ("Yoga Studio",
     "Prenatal & Postnatal Yoga",
     "Safe, nurturing classes designed specifically for expectant and new mothers at every trimester.",
     "Prenatal Yoga", "Postnatal",
     "prenatal yoga class bolsters blankets gentle supported poses"),

    ("Gym / Fitness Centre",
     "Recovery & Wellness Zone",
     "Sauna, cold plunge, foam rolling stations, and stretching area for serious post-workout recovery.",
     "Sauna", "Cold Plunge",
     "sauna interior wooden benches steam heat wellness recovery"),

    ("Martial Arts",
     "Self-Defence Workshops",
     "Practical self-defence workshops for adults and teens \u2014 real-world techniques taught in a safe, controlled setting.",
     "Self-Defence", "Women's Safety",
     "self-defence workshop arm grab escape technique demonstration"),

    ("Dance Studio",
     "Wedding & First Dance Coaching",
     "Private choreography sessions to prepare couples for their wedding first dance \u2014 any song, any style.",
     "Wedding Dance", "Choreography",
     "wedding first dance choreography couple waltz studio rehearsal"),

    ("Swimming / Aquatics",
     "Aqua Fitness & Rehabilitation",
     "Low-impact water-based fitness and rehabilitation classes ideal for injury recovery and older adults.",
     "Aqua Fitness", "Rehabilitation",
     "aqua fitness water aerobics noodles pool exercise class"),

    ("Golf Coach / Pro Shop",
     "Short Game & Putting Clinics",
     "Focused clinics on chipping, pitching, and putting \u2014 where most golfers lose the most strokes.",
     "Short Game", "Putting",
     "golf putting green practice short game chipping flag hole"),

    ("Sports Coaching",
     "Strength & Conditioning Programmes",
     "Periodised S&C programmes designed to complement sport-specific training and reduce injury risk.",
     "Strength & Conditioning", "Injury Prevention",
     "strength conditioning barbell squat rack athletic training gym"),
]

education = [
    ("Language School",
     "Conversational Afrikaans",
     "Practical Afrikaans tuition for English speakers wanting to connect in the workplace and community.",
     "Afrikaans", "Conversational",
     "Afrikaans language textbook vocabulary flashcards desk study"),

    ("After-school / Enrichment",
     "Exam Preparation Bootcamps",
     "Intensive revision workshops before mid-year and final exams covering key subjects and exam technique.",
     "Exam Prep", "Revision",
     "exam revision bootcamp past papers whiteboard study notes"),

    ("Art / Craft Classes",
     "Corporate & Team-Building Workshops",
     "Guided creative workshops for corporate teams \u2014 ceramics, painting, and collaborative art experiences.",
     "Corporate Events", "Team Building",
     "corporate team building art workshop group painting canvas"),

    ("Music Teacher / School",
     "Drums & Percussion",
     "Drum kit, djembe, and percussion lessons for beginners to advanced \u2014 solo and ensemble playing.",
     "Drums", "Percussion",
     "drum kit sticks snare cymbal lesson close-up studio"),

    ("Tutor",
     "Accounting & Business Studies",
     "One-on-one and group tutoring in accounting, business studies, and economics from Grade 10 to matric.",
     "Accounting", "Business Studies",
     "accounting textbook calculator financial statements study desk"),

    ("Driving School",
     "Code 10 & Code 14 Heavy Vehicle",
     "Professional heavy vehicle licence training for Code 10 and Code 14 with yard and road preparation.",
     "Code 10", "Heavy Vehicle",
     "heavy truck driving training yard manoeuvre code 14 vehicle"),

    ("Preschool / Cr\u00e8che",
     "Outdoor Nature Play Programme",
     "Structured outdoor learning with sensory gardens, mud kitchens, and nature walks to develop curiosity and resilience.",
     "Nature Play", "Outdoor Learning",
     "sensory garden mud kitchen outdoor play sandpit water table"),

    ("Training / Skills Academy",
     "Health & Safety Compliance Courses",
     "OHSA, fire safety, and hazardous chemical handling courses with DoL-accepted certification.",
     "OHSA Compliance", "Fire Safety",
     "fire safety training extinguisher demonstration workplace PPE"),

    ("Computer / Coding Classes",
     "Holiday Coding Camps",
     "Intensive one-week coding camps during school holidays \u2014 game design, app building, and robotics challenges.",
     "Holiday Camp", "Game Design",
     "kids coding holiday camp robotics challenge project building"),

    ("First Aid / Safety Training",
     "Wilderness & Outdoor First Aid",
     "Extended first aid for hikers, trail runners, and outdoor guides covering remote-area emergency response.",
     "Wilderness", "Outdoor First Aid",
     "wilderness first aid outdoor backpack splint bandage trail"),
]

def make_service_block(name, desc, tag1, tag2, img_query, indent):
    """Build the service JSON block with proper indentation."""
    sp = ' ' * indent  # indent for the object braces
    sp2 = ' ' * (indent + 2)  # indent for properties
    sp3 = ' ' * (indent + 4)  # indent for tag values
    return f''',
{sp}{{
{sp2}"name": "{name}",
{sp2}"description": "{desc}",
{sp2}"tags": [
{sp3}"{tag1}",
{sp3}"{tag2}"
{sp2}],
{sp2}"serviceImageQuery": "{img_query}"
{sp}}}'''


def add_4th_service(content, biz_type, name, desc, tag1, tag2, img_query, indent):
    """Find the 3rd service closing brace + array closing bracket for this business type and insert the 4th service."""
    # Find the business type key
    key_pattern = f'"{re.escape(biz_type)}":'
    key_match = re.search(key_pattern, content)
    if not key_match:
        print(f"WARNING: Could not find business type: {biz_type}")
        return content

    start_pos = key_match.start()

    # Find "services": [ after this position
    services_match = re.search(r'"services":\s*\[', content[start_pos:])
    if not services_match:
        print(f"WARNING: Could not find services array for: {biz_type}")
        return content

    services_start = start_pos + services_match.end()

    # Now find the closing ] of the services array
    # We need to count brackets to find the matching ]
    bracket_depth = 1
    pos = services_start
    while pos < len(content) and bracket_depth > 0:
        if content[pos] == '[':
            bracket_depth += 1
        elif content[pos] == ']':
            bracket_depth -= 1
        pos += 1

    # pos now points to just after the closing ]
    # We need to insert before the closing ]
    closing_bracket_pos = pos - 1

    # Find the last } before the closing ] (end of 3rd service)
    last_brace = content.rfind('}', services_start, closing_bracket_pos)

    if last_brace == -1:
        print(f"WARNING: Could not find last service closing brace for: {biz_type}")
        return content

    # Insert after the last }
    insert_pos = last_brace + 1
    service_block = make_service_block(name, desc, tag1, tag2, img_query, indent)

    content = content[:insert_pos] + service_block + content[insert_pos:]
    print(f"OK: Added 4th service to {biz_type}")
    return content


# Process HEALTH-WELLNESS (indent=6 for health types)
for biz_type, name, desc, tag1, tag2, img_query in health_wellness:
    content = add_4th_service(content, biz_type, name, desc, tag1, tag2, img_query, indent=6)

# Process FITNESS-SPORT (indent=6)
for biz_type, name, desc, tag1, tag2, img_query in fitness_sport:
    content = add_4th_service(content, biz_type, name, desc, tag1, tag2, img_query, indent=6)

# Process EDUCATION (indent=10 for education types)
for biz_type, name, desc, tag1, tag2, img_query in education:
    content = add_4th_service(content, biz_type, name, desc, tag1, tag2, img_query, indent=10)

with open(filepath, 'w') as f:
    f.write(content)

print(f"\nDone! All services added.")
