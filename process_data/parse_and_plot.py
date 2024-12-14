import os
import pandas as pd
import matplotlib.pyplot as plt

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  
DATA_DIR = os.path.join(BASE_DIR, '../data')

def load_csv_files(base_dir, test_folder):
    """
    Load all CPU/Memory and FPS usage CSV files into dataframes for a specific test folder.
    """
    results = {}
    for arch in ['fabric', 'old_arch']:
        arch_dir = os.path.join(base_dir, arch, test_folder)
        arch_data = {}
        if os.path.exists(arch_dir):
            for csv_file in ['cpu_memory_usage.csv', 'fps_usage.csv']:
                csv_path = os.path.join(arch_dir, csv_file)
                if os.path.exists(csv_path):
                    arch_data[csv_file] = pd.read_csv(csv_path)
        results[arch] = arch_data
    return results


def plot_comparison(data, save_dir, with_switch_points=False):
    """
    Plot comparison for CPU/Memory and FPS usage between fabric and old_arch with normalized time.
    """
    fabric_data = data.get('fabric')
    old_arch_data = data.get('old_arch')

    if fabric_data and old_arch_data:
        cpu_memory_fabric = fabric_data.get('cpu_memory_usage.csv')
        cpu_memory_old_arch = old_arch_data.get('cpu_memory_usage.csv')

        if cpu_memory_fabric is not None and cpu_memory_old_arch is not None:
            min_index = min(len(cpu_memory_fabric), len(cpu_memory_old_arch))

            plt.figure(figsize=(12, 6))
            fig, ax1 = plt.subplots(figsize=(12, 6))
            time_index = [i * 5 for i in range(min_index)]

            ax1.plot(time_index, cpu_memory_fabric['CPU Usage'][:min_index], label='Fabric CPU Usage (%)', color='blue')
            ax1.plot(time_index, cpu_memory_old_arch['CPU Usage'][:min_index], label='Old Arch CPU Usage (%)', color='red')
            ax1.set_xlabel('Relative Time (seconds)')
            ax1.set_ylabel('CPU Usage (%)', color='blue')
            ax1.tick_params(axis='y', labelcolor='blue')

            ax2 = ax1.twinx()
            ax2.plot(time_index, cpu_memory_fabric['Memory Usage'][:min_index], label='Fabric Memory Usage (MB)', color='green')
            ax2.plot(time_index, cpu_memory_old_arch['Memory Usage'][:min_index], label='Old Arch Memory Usage (MB)', color='orange')
            ax2.set_ylabel('Memory Usage (MB)', color='green')
            ax2.tick_params(axis='y', labelcolor='green')

            if with_switch_points:
                ax1.axvline(x=10, color='red', linestyle='--', label='Switch to CPU Intensive Screen')
                ax1.axvline(x=40, color='purple', linestyle='--', label='Switch to Memory Intensive Screen')
                ax2.axvline(x=10, color='red', linestyle='--')
                ax2.axvline(x=40, color='purple', linestyle='--')

            plt.title('Comparison of CPU and Memory Usage (Fabric vs Old Arch)')
            ax1.legend(loc='upper left')
            ax2.legend(loc='upper right')
            fig.tight_layout()

            save_path = os.path.join(save_dir, 'comparison_cpu_memory_usage.png')
            plt.savefig(save_path)
            print(f'Saved Comparison CPU/Memory Usage Plot: {save_path}')

        fps_fabric = fabric_data.get('fps_usage.csv')
        fps_old_arch = old_arch_data.get('fps_usage.csv')

        if fps_fabric is not None and fps_old_arch is not None:
            min_index = min(len(fps_fabric), len(fps_old_arch))

            plt.figure(figsize=(12, 6))
            plt.plot(fps_fabric.index[:min_index], fps_fabric['FPS'][:min_index], label='Fabric FPS', color='blue')
            plt.plot(fps_old_arch.index[:min_index], fps_old_arch['FPS'][:min_index], label='Old Arch FPS', color='red')

            if with_switch_points:
                plt.axvline(x=25, color='red', linestyle='--', label='Switch to CPU Intensive Screen')
                plt.axvline(x=48, color='purple', linestyle='--', label='Switch to Memory Intensive Screen')

            plt.title('Comparison of FPS Usage (Fabric vs Old Arch)')
            plt.xlabel('Relative Time')
            plt.ylabel('FPS')
            plt.legend()
            plt.tight_layout()

            save_path = os.path.join(save_dir, 'comparison_fps_usage.png')
            plt.savefig(save_path)
            print(f'Saved Comparison FPS Usage Plot: {save_path}')


def main():
    test_folders = [
        'data_fetching_and_loading_with_scrolling_performance_test',
        'render_svg_performance_test',
        'scroll_performance_test',
        'text_performance_test',
        'views_performance_test'
    ]

    for test_folder in test_folders:
        print(f'Processing {test_folder}...')
        data = load_csv_files(DATA_DIR, test_folder)

        output_dir = os.path.join(BASE_DIR, 'plots', test_folder)
        os.makedirs(output_dir, exist_ok=True)

        with_switch_points = test_folder == 'data_fetching_and_loading_with_scrolling_performance_test'
        plot_comparison(data, output_dir, with_switch_points=with_switch_points)


if __name__ == '__main__':
    main()