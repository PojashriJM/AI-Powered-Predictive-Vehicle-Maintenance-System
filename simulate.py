import numpy as np
import pandas as pd

np.random.seed(42)

def generate_data(n_samples=2000):
    mileage = np.random.normal(50000, 8000, n_samples)
    rpm = np.random.normal(2200, 500, n_samples)
    temp = np.random.normal(85, 10, n_samples)
    vibration = np.abs(np.random.normal(0.02, 0.01, n_samples))

    # failure risk increases with vibration + temp + age(mileage)
    failure_prob = (
        0.3*(vibration*50) +
        0.3*(temp/120) +
        0.4*(mileage/100000)
    )

    failure_label = (failure_prob > 0.65).astype(int)

    df = pd.DataFrame({
        "mileage": mileage,
        "rpm": rpm,
        "temp": temp,
        "vibration": vibration,
        "failure": failure_label
    })
    return df

df = generate_data()
df.to_csv("results/simulated_data.csv", index=False)
print("Simulated data created!")
