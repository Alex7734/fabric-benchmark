import os
import pandas as pd
import matplotlib.pyplot as plt

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  
DATA_DIR = os.path.join(BASE_DIR, '../data')

SWITCH_TO_CPU_INTENSIVE = 25 
SWITCH_TO_MEMORY_INTENSIVE = SWITCH_TO_CPU_INTENSIVE + 20 


def load_csv_files(base_dir):
    """
    Load all CPU/Memory and FPS usage CSV files into dataframes.
    """
    results = {}
    for arch in ['fabric', 'old_arch']:
        arch_dir = os.path.join(base_dir, arch)
        arch_data = {}
        if os.path.exists(arch_dir):
            for csv_file in ['cpu_memory_usage.csv', 'fps_usage.csv']:
                csv_path = os.path.join(arch_dir, 'data_fetching_and_loading_with_scrolling_performance_test', csv_file)
                if os.path.exists(csv_path):
                    arch_data[csv_file] = pd.read_csv(csv_path)
        results[arch] = arch_data
    return results


def plot_cpu_memory(data, arch, save_dir):
    """
    Plot CPU and Memory usage over time with separate y-axes and vertical lines for screen switches.
    """
    cpu_memory_data = data.get('cpu_memory_usage.csv')
    if cpu_memory_data is not None:
        cpu_memory_data['Timestamp'] = pd.to_datetime(cpu_memory_data['Timestamp'])
        initial_timestamp = cpu_memory_data['Timestamp'].iloc[0]
        
        switch_to_cpu = initial_timestamp + pd.Timedelta(seconds=SWITCH_TO_CPU_INTENSIVE)
        switch_to_memory = initial_timestamp + pd.Timedelta(seconds=SWITCH_TO_MEMORY_INTENSIVE)

        plt.figure(figsize=(12, 6))
        fig, ax1 = plt.subplots(figsize=(12, 6))

        ax1.set_xlabel('Time')
        ax1.set_ylabel('CPU Usage (%)', color='blue')
        ax1.plot(cpu_memory_data['Timestamp'], cpu_memory_data['CPU Usage'], label='CPU Usage (%)', color='blue')
        ax1.tick_params(axis='y', labelcolor='blue')

        ax2 = ax1.twinx()
        ax2.set_ylabel('Memory Usage (MB)', color='green')
        ax2.plot(cpu_memory_data['Timestamp'], cpu_memory_data['Memory Usage'], label='Memory Usage (MB)', color='green')
        ax2.tick_params(axis='y', labelcolor='green')

        ax1.axvline(x=switch_to_cpu, color='red', linestyle='--', label='Switch to CPU Intensive Screen')
        ax1.axvline(x=switch_to_memory, color='purple', linestyle='--', label='Switch to Memory Intensive Screen')

        plt.title(f'CPU and Memory Usage ({arch})')
        ax1.legend(loc='upper left')
        ax2.legend(loc='upper right')
        fig.tight_layout()

        save_path = os.path.join(save_dir, f'{arch}_cpu_memory_usage.png')
        plt.savefig(save_path)
        print(f'Saved CPU/Memory Usage Plot: {save_path}')


def plot_fps(data, arch, save_dir):
    """
    Plot FPS usage over time with vertical lines for screen switches.
    """
    fps_data = data.get('fps_usage.csv')
    if fps_data is not None:
        fps_data['Timestamp'] = pd.to_datetime(fps_data['Timestamp'])
        initial_timestamp = fps_data['Timestamp'].iloc[0]
        
        switch_to_cpu = initial_timestamp + pd.Timedelta(seconds=SWITCH_TO_CPU_INTENSIVE)
        switch_to_memory = initial_timestamp + pd.Timedelta(seconds=SWITCH_TO_MEMORY_INTENSIVE)

        plt.figure(figsize=(12, 6))
        plt.plot(fps_data['Timestamp'], fps_data['FPS'], label='FPS', color='purple')

        plt.axvline(x=switch_to_cpu, color='red', linestyle='--', label='Switch to CPU Intensive Screen')
        plt.axvline(x=switch_to_memory, color='purple', linestyle='--', label='Switch to Memory Intensive Screen')

        plt.title(f'FPS Usage ({arch})')
        plt.xlabel('Time')
        plt.ylabel('FPS')
        plt.legend()
        plt.xticks(rotation=45)
        plt.tight_layout()

        save_path = os.path.join(save_dir, f'{arch}_fps_usage.png')
        plt.savefig(save_path)
        print(f'Saved FPS Plot: {save_path}')

def plot_comparison(data, save_dir):
    """
    Plot comparison for CPU/Memory and FPS usage between fabric and old_arch with normalized time.
    """
    fabric_data = data.get('fabric')
    old_arch_data = data.get('old_arch')

    if fabric_data and old_arch_data:
        cpu_memory_fabric = fabric_data.get('cpu_memory_usage.csv')
        cpu_memory_old_arch = old_arch_data.get('cpu_memory_usage.csv')

        if cpu_memory_fabric is not None and cpu_memory_old_arch is not None:
            cpu_memory_fabric['Timestamp'] = pd.to_datetime(cpu_memory_fabric['Timestamp'])
            cpu_memory_old_arch['Timestamp'] = pd.to_datetime(cpu_memory_old_arch['Timestamp'])

            cpu_memory_fabric['Elapsed Time'] = (cpu_memory_fabric['Timestamp'] - cpu_memory_fabric['Timestamp'].iloc[0]).dt.total_seconds()
            cpu_memory_old_arch['Elapsed Time'] = (cpu_memory_old_arch['Timestamp'] - cpu_memory_old_arch['Timestamp'].iloc[0]).dt.total_seconds()

            plt.figure(figsize=(12, 6))
            plt.plot(cpu_memory_fabric['Elapsed Time'], cpu_memory_fabric['CPU Usage'], label='Fabric CPU Usage (%)', color='blue')
            plt.plot(cpu_memory_old_arch['Elapsed Time'], cpu_memory_old_arch['CPU Usage'], label='Old Arch CPU Usage (%)', color='red')
            plt.plot(cpu_memory_fabric['Elapsed Time'], cpu_memory_fabric['Memory Usage'], label='Fabric Memory Usage (MB)', color='green')
            plt.plot(cpu_memory_old_arch['Elapsed Time'], cpu_memory_old_arch['Memory Usage'], label='Old Arch Memory Usage (MB)', color='orange')

            plt.title('Comparison of CPU and Memory Usage (Fabric vs Old Arch)')
            plt.xlabel('Elapsed Time (s)')
            plt.ylabel('Usage')
            plt.legend()
            plt.tight_layout()

            save_path = os.path.join(save_dir, 'comparison_cpu_memory_usage.png')
            plt.savefig(save_path)
            print(f'Saved Comparison CPU/Memory Usage Plot: {save_path}')

        fps_fabric = fabric_data.get('fps_usage.csv')
        fps_old_arch = old_arch_data.get('fps_usage.csv')

        if fps_fabric is not None and fps_old_arch is not None:
            fps_fabric['Timestamp'] = pd.to_datetime(fps_fabric['Timestamp'])
            fps_old_arch['Timestamp'] = pd.to_datetime(fps_old_arch['Timestamp'])

            fps_fabric['Elapsed Time'] = (fps_fabric['Timestamp'] - fps_fabric['Timestamp'].iloc[0]).dt.total_seconds()
            fps_old_arch['Elapsed Time'] = (fps_old_arch['Timestamp'] - fps_old_arch['Timestamp'].iloc[0]).dt.total_seconds()

            plt.figure(figsize=(12, 6))
            plt.plot(fps_fabric['Elapsed Time'], fps_fabric['FPS'], label='Fabric FPS', color='blue')
            plt.plot(fps_old_arch['Elapsed Time'], fps_old_arch['FPS'], label='Old Arch FPS', color='red')

            plt.title('Comparison of FPS Usage (Fabric vs Old Arch)')
            plt.xlabel('Elapsed Time (s)')
            plt.ylabel('FPS')
            plt.legend()
            plt.tight_layout()

            save_path = os.path.join(save_dir, 'comparison_fps_usage.png')
            plt.savefig(save_path)
            print(f'Saved Comparison FPS Usage Plot: {save_path}')
    """
    Plot comparison for CPU/Memory and FPS usage between fabric and old_arch.
    """
    fabric_data = data.get('fabric')
    old_arch_data = data.get('old_arch')

    if fabric_data and old_arch_data:
        cpu_memory_fabric = fabric_data.get('cpu_memory_usage.csv')
        cpu_memory_old_arch = old_arch_data.get('cpu_memory_usage.csv')

        if cpu_memory_fabric is not None and cpu_memory_old_arch is not None:
            cpu_memory_fabric['Timestamp'] = pd.to_datetime(cpu_memory_fabric['Timestamp'])
            cpu_memory_old_arch['Timestamp'] = pd.to_datetime(cpu_memory_old_arch['Timestamp'])

            plt.figure(figsize=(12, 6))
            plt.plot(cpu_memory_fabric['Timestamp'], cpu_memory_fabric['CPU Usage'], label='Fabric CPU Usage (%)', color='blue')
            plt.plot(cpu_memory_old_arch['Timestamp'], cpu_memory_old_arch['CPU Usage'], label='Old Arch CPU Usage (%)', color='red')
            plt.plot(cpu_memory_fabric['Timestamp'], cpu_memory_fabric['Memory Usage'], label='Fabric Memory Usage (MB)', color='green')
            plt.plot(cpu_memory_old_arch['Timestamp'], cpu_memory_old_arch['Memory Usage'], label='Old Arch Memory Usage (MB)', color='orange')

            plt.title('Comparison of CPU and Memory Usage (Fabric vs Old Arch)')
            plt.xlabel('Time')
            plt.ylabel('Usage')
            plt.legend()
            plt.xticks(rotation=45)
            plt.tight_layout()

            save_path = os.path.join(save_dir, 'comparison_cpu_memory_usage.png')
            plt.savefig(save_path)
            print(f'Saved Comparison CPU/Memory Usage Plot: {save_path}')

        fps_fabric = fabric_data.get('fps_usage.csv')
        fps_old_arch = old_arch_data.get('fps_usage.csv')

        if fps_fabric is not None and fps_old_arch is not None:
            fps_fabric['Timestamp'] = pd.to_datetime(fps_fabric['Timestamp'])
            fps_old_arch['Timestamp'] = pd.to_datetime(fps_old_arch['Timestamp'])

            plt.figure(figsize=(12, 6))
            plt.plot(fps_fabric['Timestamp'], fps_fabric['FPS'], label='Fabric FPS', color='blue')
            plt.plot(fps_old_arch['Timestamp'], fps_old_arch['FPS'], label='Old Arch FPS', color='red')

            plt.title('Comparison of FPS Usage (Fabric vs Old Arch)')
            plt.xlabel('Time')
            plt.ylabel('FPS')
            plt.legend()
            plt.xticks(rotation=45)
            plt.tight_layout()

            save_path = os.path.join(save_dir, 'comparison_fps_usage.png')
            plt.savefig(save_path)
            print(f'Saved Comparison FPS Usage Plot: {save_path}')


def main():
    data = load_csv_files(DATA_DIR)

    output_dir = os.path.join(BASE_DIR, 'plots')
    os.makedirs(output_dir, exist_ok=True)

    for arch, arch_data in data.items():
        print(f'Processing {arch} data...')
        plot_cpu_memory(arch_data, arch, output_dir)
        plot_fps(arch_data, arch, output_dir)

    plot_comparison(data, output_dir)

if __name__ == '__main__':
    main()
