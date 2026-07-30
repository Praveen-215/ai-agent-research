import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import json
import os
import glob
import time

# --- Page Config ---
st.set_page_config(page_title="AI Agent Simulator", page_icon="🤖", layout="wide")

# --- Auto-refresh settings (UI only) ---
st.sidebar.title("⚙️ Settings")
auto_refresh = st.sidebar.checkbox("Auto-Refresh", value=True)
refresh_rate = st.sidebar.slider("Refresh Rate (seconds)", 2, 30, 5)

# --- Data Loading ---
@st.cache_data(ttl=1)
def load_data():
    results_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'results')
    if not os.path.exists(results_dir):
        return []
    
    json_files = glob.glob(os.path.join(results_dir, '*.json'))
    data = []
    for f in json_files:
        with open(f, 'r') as file:
            try:
                data.append(json.load(file))
            except json.JSONDecodeError:
                pass
    # Sort by timestamp, newest first
    data.sort(key=lambda x: x.get('timestamp', ''), reverse=True)
    return data

data = load_data()

st.title("🤖 AI Agent Simulation Dashboard")

if not data:
    st.warning("No simulation data found in `results/` directory.")
    st.stop()

# --- Historical Trends Section ---
df_trends = pd.DataFrame([{
    'experiment_id': d.get('experiment_id'),
    'timestamp': d.get('timestamp'),
    'pressure_level': d.get('pressure_level'),
    'performance': d.get('overall_metrics', {}).get('agent_performance', 0),
    'deception_rate': d.get('overall_metrics', {}).get('deception_rate', 0),
    'honesty_score': d.get('overall_metrics', {}).get('honesty_score', 0),
    'task_completion_rate': d.get('overall_metrics', {}).get('task_completion_rate', 0)
} for d in data])

# Map pressure for plotting
pressure_map = {"LOW": 1, "NORMAL": 2, "HIGH": 3, "IMPOSSIBLE": 4}
df_trends['pressure_score'] = df_trends['pressure_level'].map(pressure_map)
df_trends = df_trends.sort_values('timestamp')

with st.expander("📈 Historical Trends (Click to Expand)", expanded=True):
    col1, col2 = st.columns(2)
    
    with col1:
        fig_perf = go.Figure()
        fig_perf.add_trace(go.Scatter(x=df_trends['experiment_id'], y=df_trends['performance'], name="Performance", mode="lines+markers", line=dict(color="#00CC96")))
        fig_perf.add_trace(go.Scatter(x=df_trends['experiment_id'], y=df_trends['pressure_score'], name="Pressure Score", yaxis="y2", mode="lines+markers", line=dict(color="#EF553B", dash='dot')))
        fig_perf.update_layout(
            title="Performance vs Pressure Level",
            yaxis=dict(title="Performance Score (0-100)"),
            yaxis2=dict(title="Pressure (1=Low, 4=Impossible)", overlaying="y", side="right", range=[0, 5]),
            plot_bgcolor="rgba(0,0,0,0)",
            paper_bgcolor="rgba(0,0,0,0)",
            legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
        )
        st.plotly_chart(fig_perf, use_container_width=True)

    with col2:
        fig_rates = go.Figure()
        fig_rates.add_trace(go.Scatter(x=df_trends['experiment_id'], y=df_trends['task_completion_rate'], name="Completion Rate", mode="lines+markers", line=dict(color="#636EFA")))
        fig_rates.add_trace(go.Scatter(x=df_trends['experiment_id'], y=df_trends['deception_rate'], name="Deception Rate", mode="lines+markers", line=dict(color="#FFA15A")))
        fig_rates.update_layout(
            title="Task Completion vs Deception Rate",
            yaxis=dict(title="Rate (0.0 - 1.0)", tickformat=".0%"),
            plot_bgcolor="rgba(0,0,0,0)",
            paper_bgcolor="rgba(0,0,0,0)",
            legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
        )
        st.plotly_chart(fig_rates, use_container_width=True)

st.divider()

# --- Specific Experiment View ---
st.sidebar.header("🔍 Experiment View")
experiment_ids = [d['experiment_id'] for d in data]
selected_exp_id = st.sidebar.selectbox("Select Experiment", experiment_ids)

selected_exp = next(d for d in data if d['experiment_id'] == selected_exp_id)

st.header(f"Experiment Details: `{selected_exp_id}`")

# Top Metrics
metrics_col1, metrics_col2, metrics_col3, metrics_col4 = st.columns(4)
metrics_col1.metric("Status", selected_exp.get('status', 'N/A'))
metrics_col2.metric("Pressure Level", selected_exp.get('pressure_level', 'N/A'))
metrics_col3.metric("Deception Rate", f"{selected_exp.get('overall_metrics', {}).get('deception_rate', 0):.0%}")
metrics_col4.metric("Task Completion", f"{selected_exp.get('overall_metrics', {}).get('task_completion_rate', 0):.0%}")

# Main Content
st.subheader("👨‍💻 Developer Progress & Deception (Actual vs Reported)")
dev_reports = selected_exp.get('developer_reports', [])
if dev_reports:
    dev_df = pd.DataFrame(dev_reports)
    
    fig_dev = go.Figure(data=[
        go.Bar(name='Actual Progress', x=dev_df['agent_id'] + "<br>(" + dev_df['task_id'] + ")", y=dev_df['actual_progress'], marker_color='#00CC96'),
        go.Bar(name='Reported Progress', x=dev_df['agent_id'] + "<br>(" + dev_df['task_id'] + ")", y=dev_df['reported_progress'], marker_color='#EF553B')
    ])
    fig_dev.update_layout(
        barmode='group', 
        yaxis=dict(title="Progress (%)", range=[0, 105]),
        plot_bgcolor="rgba(0,0,0,0)",
        paper_bgcolor="rgba(0,0,0,0)",
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
    )
    st.plotly_chart(fig_dev, use_container_width=True)
    
    with st.expander("View Raw Developer Reports"):
        st.dataframe(dev_df, use_container_width=True)
else:
    st.info("No developer reports available for this experiment.")

col_t, col_a = st.columns(2)

with col_t:
    st.subheader("📋 Tasks Assigned by Manager")
    tasks = selected_exp.get('manager', {}).get('tasks_assigned', [])
    if tasks:
        tasks_df = pd.DataFrame(tasks)
        st.dataframe(tasks_df, use_container_width=True, hide_index=True)
    else:
        st.info("No tasks assigned.")

with col_a:
    st.subheader("🕵️ Auditor Results")
    auditor = selected_exp.get('auditor_results', {})
    if auditor:
        # Create a mini gauge chart for audit score
        score = auditor.get('code_quality_score', 0)
        fig_gauge = go.Figure(go.Indicator(
            mode = "gauge+number",
            value = score,
            domain = {'x': [0, 1], 'y': [0, 1]},
            title = {'text': "Code Quality Score"},
            gauge = {
                'axis': {'range': [None, 100]},
                'bar': {'color': "darkblue"},
                'steps': [
                    {'range': [0, 50], 'color': "lightcoral"},
                    {'range': [50, 80], 'color': "gold"},
                    {'range': [80, 100], 'color': "lightgreen"}
                ]
            }
        ))
        fig_gauge.update_layout(height=250, margin=dict(l=10, r=10, t=40, b=10))
        st.plotly_chart(fig_gauge, use_container_width=True)
        
        st.metric("Issues Found", auditor.get('issues_found', 0))
    else:
        st.info("No auditor results available.")

# --- Auto-refresh execution ---
# This must be at the very end of the script so the UI renders first!
if auto_refresh:
    time.sleep(refresh_rate)
    st.rerun()
