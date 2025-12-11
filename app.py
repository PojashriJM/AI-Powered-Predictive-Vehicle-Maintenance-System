import streamlit as st
import numpy as np
import base64

# Function to convert local file to base64 string
def get_base64_of_bin_file(bin_file):
    with open(bin_file, 'rb') as f:
        data = f.read()
    return base64.b64encode(data).decode()

img_path = r"C:\Users\haran\Downloads\Gemini_Generated_Image_9okumk9okumk9oku.png" # Make sure this matches your file name and path

page_bg_img = f'''
<style>
.stApp {{
    background-image: url("data:image/png;base64,{get_base64_of_bin_file(img_path)}");
    background-size: cover; 
    background-attachment: local; 
    background-opacity: 0.6; }}
</style>
'''

st.markdown(page_bg_img, unsafe_allow_html=True)

st.set_page_config(
    page_title="AutoGuard – Predictive Vehicle Maintenance",
    page_icon="",
    layout="centered"
)

st.markdown("""
<style>

/* --- General Background & Header Fixes (from previous steps) --- */
.stApp {
    background-size: cover;
    background-attachment: fixed;
    /* This ensures your image is the background for everything */
    background-position: center; 
}
[data-testid="stHeader"], [data-testid="stToolbar"] {
    background-color: rgba(0,0,0,0);
    visibility: hidden;
    height: 0px;
}
[data-testid="stToolbar"] {
    background-color: rgba(0,0,0,0); 
    visibility: hidden; 
    height: 0px; 
}

.stApp .block-container {
    max-width: 700px; 
    padding-top: 1rem;
    padding-right: 1rem;
    padding-left: 1rem;
    padding-bottom: 2rem;
    margin-left: 5%;
    margin-right: auto; 
    margin-top: 2rem;
    
    background-color: rgba(255, 255, 255, 0.1); 
    backdrop-filter: blur(10px); 
    border-radius: 15px; 
    border: 1px solid rgba(255, 255, 255, 0.2); 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
}

.stApp h1, .title, .stApp label {
    color: #fcfafb; 
}
            
.stApp  .title{
    color: #fcfafb; 
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    font-family: 'Tangerine', serif;
}

[data-testid="stNumberInput"] input {
    background: rgba(255, 255, 255, 0.9); 
    color: #0a0a0a;
    border-radius: 8px;
    padding: 10px;
}


[data-testid="stButton"] > button {
    background-color: #ff4da6;
    color: white;
    width: 100%;
}

[data-testid="stButton"] > button:hover {
    background-color: #e60073;
    transform: scale(1.02);
}

.output-box {
    margin-top: 0px;
    background: #ffe6f2;
    padding: 20px;
    border-radius: 12px;
    border-left: 6px solid #b30059;
    color: #0a0a0a; 
}

.output-box h3, .output-box strong {
    color: #0a0a0a;
}

            
</style>
""", unsafe_allow_html=True)



# Title
st.markdown("<div class='title'> AutoGuard – Predictive Maintenance</div>", unsafe_allow_html=True)
st.write("")

# Input Section
st.markdown("<div class='input-box'>", unsafe_allow_html=True)
st.subheader(" Enter Sensor Readings")

mileage = st.number_input("Mileage (km)", 10000, 200000, 50000)
temp = st.number_input("Engine Temperature (°C)", 60, 150, 90)
rpm = st.number_input("RPM", 500, 6000, 2200)
vibration = st.number_input("Vibration Level", 0.00, 1.00, 0.02, step=0.01)

st.markdown("</div>", unsafe_allow_html=True)

# Button
if st.button(" Predict Failure"):
    
    # Simulated ML logic
    probability = round((temp/150)*40 + (vibration*100)*30 + (mileage/200000)*30, 2)

    if probability > 80:
        est_days = "Failure expected within 7 days"
    elif probability > 50:
        est_days = "Failure expected within 15 days"
    else:
        est_days = "No immediate failure risk"

    components = ["Brake Pad", "Suspension", "Engine Valve", "Battery", "Cooling System"]
    component = np.random.choice(components)

    # Output Section
    st.markdown("<div class='output-box'>", unsafe_allow_html=True)

    st.markdown(f"""
    ### Component: **{component}**  
    **Failure Probability:** {probability}%  
    **Estimated Failure:** {est_days}
    """)

    st.markdown("</div>", unsafe_allow_html=True)
