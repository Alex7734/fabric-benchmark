TEST_SCENARIOS = {
    'data_fetching_and_loading_with_scrolling_performance_test': {
        'title': 'Small Twitter Feed with Heavy Computation Test',
        'description': (
            "This scenario tests the scrolling performance and data loading capabilities. "
            "We fetch and display a list of 1000 tweets. "
            "We compare how the Fabric architecture stacks up against the Old Architecture "
            "in terms of CPU/Memory usage and FPS while loading and scrolling through data. "
            "We also measure the performance of the app when switching between CPU and Memory intensive screens, "
            "where the CPU intensive screen has a lot of computation (trying to compute hundreds of thousands of prime numbers), "
            "and the Memory intensive screen has a lot of data to attribute, millions of chunks for arrays."
        ),
        'video': 'data_fetching_and_loading_with_scrolling_performance_test.mp4',
        'cpu_memory_chart': {
            'samsung_galaxy_s21': 'data_fetching_and_loading_with_scrolling_performance_test/comparison_cpu_memory_usage.png',
            'pixel_6': 'data_fetching_and_loading_with_scrolling_performance_test/pixel_comparison_cpu_memory_usage.png',
            'oneplus_9': 'data_fetching_and_loading_with_scrolling_performance_test/oneplus9_comparison_cpu_memory_usage.png'
        },
        'fps_chart': {
            'samsung_galaxy_s21': 'data_fetching_and_loading_with_scrolling_performance_test/comparison_fps_usage.png',
            'pixel_6': 'data_fetching_and_loading_with_scrolling_performance_test/pixel_comparison_fps_usage.png',
            'oneplus_9': 'data_fetching_and_loading_with_scrolling_performance_test/oneplus9_comparison_fps_usage.png'
        }
    },
    'render_svg_performance_test': {
        'title': 'SVG Rendering Performance Test',
        'description': (
            "In this scenario, we render 100 complex SVGs simultaneously to measure performance. "
            "We stress the rendering pipeline to see how efficiently the app handles vector graphics "
            "with Fabric enabled vs. the Old Architecture."
        ),
        'video': 'views_performance_test.mp4',
        'cpu_memory_chart': {
            'samsung_galaxy_s21': 'views_performance_test/comparison_cpu_memory_usage.png',
            'pixel_6': 'views_performance_test/pixel_comparison_cpu_memory_usage.png',
            'oneplus_9': 'views_performance_test/oneplus9_comparison_cpu_memory_usage.png'
        },
        'fps_chart': {
            'samsung_galaxy_s21': 'views_performance_test/comparison_fps_usage.png',
            'pixel_6': 'views_performance_test/pixel_comparison_fps_usage.png',
            'oneplus_9': 'views_performance_test/oneplus9_comparison_fps_usage.png'
        }
    },
    'scroll_performance_test': {
        'title': 'Scroll Performance Test',
        'description': (
            "This test measures how smoothly the UI scrolls through a large list of views. "
            "It checks FPS, CPU and Memory usage during intensive scroll operations."
        ),
        'video': 'scroll_performance_test.mp4',
        'cpu_memory_chart': {
            'samsung_galaxy_s21': 'scroll_performance_test/comparison_cpu_memory_usage.png',
            'pixel_6': 'scroll_performance_test/pixel_comparison_cpu_memory_usage.png',
            'oneplus_9': 'scroll_performance_test/oneplus9_comparison_cpu_memory_usage.png'
        },
        'fps_chart': {
            'samsung_galaxy_s21': 'scroll_performance_test/comparison_fps_usage.png',
            'pixel_6': 'scroll_performance_test/pixel_comparison_fps_usage.png',
            'oneplus_9': 'scroll_performance_test/oneplus9_comparison_fps_usage.png'
        }
    },
    'text_performance_test': {
        'title': 'Text Rendering Performance Test',
        'description': (
            "Rendering thousands of text elements stresses the text layout and rendering pipeline. "
            "We compare how quickly and efficiently Fabric and the Old Architecture handle large amounts of text."
        ),
        'video': 'views_performance_test.mp4',
        'cpu_memory_chart': {
            'samsung_galaxy_s21': 'text_performance_test/comparison_cpu_memory_usage.png',
            'pixel_6': 'text_performance_test/pixel_comparison_cpu_memory_usage.png',
            'oneplus_9': 'text_performance_test/oneplus9_comparison_cpu_memory_usage.png'
        },
        'fps_chart': {
            'samsung_galaxy_s21': 'text_performance_test/comparison_fps_usage.png',
            'pixel_6': 'text_performance_test/pixel_comparison_fps_usage.png',
            'oneplus_9': 'text_performance_test/oneplus9_comparison_fps_usage.png'
        }
    },
    'views_performance_test': {
        'title': 'Views Rendering Performance Test',
        'description': (
            "This scenario tests the app's ability to handle large numbers of simple views. "
            "We compare performance in rendering and managing thousands of view components."
        ),
        'video': 'views_performance_test.mp4',
        'cpu_memory_chart': {
            'samsung_galaxy_s21': 'views_performance_test/comparison_cpu_memory_usage.png',
            'pixel_6': 'views_performance_test/pixel_comparison_cpu_memory_usage.png',
            'oneplus_9': 'views_performance_test/oneplus9_comparison_cpu_memory_usage.png'
        },
        'fps_chart': {
            'samsung_galaxy_s21': 'views_performance_test/comparison_fps_usage.png',
            'pixel_6': 'views_performance_test/pixel_comparison_fps_usage.png',
            'oneplus_9': 'views_performance_test/oneplus9_comparison_fps_usage.png'
        }
    }
}

DEVICES = {
    'samsung_galaxy_s21': {
        'name': 'Samsung Galaxy S21',
        'os': 'Android 13',
        'ram': '8 GB RAM',
        'cpu': 'Exynos 2100: Octa-core (1x2.9 GHz Cortex-X1 & 3x2.8 GHz Cortex-A78 & 4x2.2 GHz Cortex-A55)',
        'gpu': 'Mali-G78 MP14'
    },
    'pixel_6': {
        'name': 'Google Pixel 6',
        'os': 'Android 13',
        'ram': '8 GB RAM',
        'cpu': 'Google Tensor CPU',
        'gpu': 'Mali-G78 MP20'
    },
    'oneplus_9': {
        'name': 'OnePlus 9',
        'os': 'Android 13',
        'ram': '12 GB RAM',
        'cpu': 'Snapdragon 888',
        'gpu': 'Adreno 660'
    }
}
